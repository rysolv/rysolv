/* eslint-disable no-unused-expressions */
const { CustomError, errorLogger } = require('../../../helpers');
const {
  getAllCandidates,
  getOnePosition,
  matchCandidates: matchCandidatesQuery,
} = require('../../../db');
const { matchCandidatesError, matchCandidatesSuccess } = require('./constants');

/**
 * Match Candidates to Positions:
 * -- get question/answers for all active users
 * -- get question/answers for position
 * -- insert matching users into candidate_positions table
 *
 * Matching Criteria:
 * -- location & timezone                    Required
 * -- experience                             Required
 * -- position type (fulltime / contractor)  Required
 * -- languages                              40%
 * -- frameworks                             20%
 * -- roles (front-end, backend, etc.)       20%
 * -- salary                                 20%
 */

const matchCandidates = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const t1 = new Date();

    // Get position details
    const {
      positionKeys,
      roleKeys: reqRoles,
      skills: reqLanguages,
    } = await getOnePosition({
      positionId,
    });

    const {
      experience: reqExperience,
      salary: reqSalary,
      type: reqType,
    } = positionKeys;

    // Get Candidate details
    const allCandidates = await getAllCandidates();

    const candidates = allCandidates.map(
      ({
        id,
        userLanguages,
        userResponses,
        userRoles,
        userType = ['contractor', 'full_time'], // @TODO
      }) => {
        const {
          experience: userExperience,
          target_salary: userSalary,
        } = userResponses;

        // Adjust ratios to prioritize different criteria
        // Everything should add to 1.00
        const matchCriteria = {
          experience: false,
          frameworks: 0.2,
          languages: 0.4,
          location: false,
          roles: 0.2,
          salary: 0.2,
          type: false,
        };

        // ******************************* Check Location ************************************
        // TODO - add to location table

        // ******************************* Check Experience **********************************
        // Matching: senior_experience, '1 - 2 years', etc.
        // Return: true/false
        const expDictionary = {
          junior_experience: 0,
          midlevel_experience: 1,
          senior_experience: 2,
        };
        if (userExperience >= expDictionary[reqExperience]) {
          matchCriteria.experience = true;
        }

        // ******************************* Check Languages ***********************************
        // Matching: {language: ' level
        // If the language matches, give 0.5pts, if the skill matches/exceeds give 1.0pt
        let frameworkCount = 0;
        let frameworkMatch = 0;
        let languageCount = 0;
        let languageMatch = 0;

        reqLanguages.forEach(rl => {
          if (rl.framework) frameworkCount++;
          if (rl.language) languageCount++;

          userLanguages.forEach(ul => {
            if (ul.shortName === rl.shortName) {
              const language = !!rl.language;
              if (ul.level >= rl.level) {
                language ? languageMatch++ : frameworkMatch++;
              } else {
                language ? (languageMatch += 0.5) : (frameworkMatch += 0.5);
              }
            }
          });
        });

        matchCriteria.frameworks *= frameworkMatch / frameworkCount || 0;
        matchCriteria.languages *= languageMatch / languageCount || 0;

        // ******************************* Check Roles ***************************************
        // Matching: front_end, back_end, ios, etc.
        // Result: (# matching roles / reqRoles) * matchCriteria.roles
        const matchingRoles = reqRoles.map(el =>
          userRoles.includes(el) ? 1 : 0,
        );
        const matchSum = matchingRoles.reduce((a, b) => a + b, 0);
        matchCriteria.roles *= matchSum / reqRoles.length;

        // ******************************* Check Position Type *******************************
        // Matching: userType:['full_time', 'contractor'], reqType: 'full_time'
        // Result: true/false
        if (userType.includes(reqType)) {
          matchCriteria.type = true;
        }

        // ******************************* Check Salary **************************************
        // userSal <= reqSal = 100%
        // (userSal - $25k) <= reqSal = 50%
        const salaryMatch = +userSalary <= +reqSalary;
        const salaryClose = +userSalary - 25 <= +reqSalary;

        if (salaryMatch) matchCriteria.salary *= 1;
        else if (salaryClose) matchCriteria.salary *= 0.5;
        else matchCriteria.salary = 0;

        // Sum numerical categories
        const total =
          matchCriteria.frameworks +
          matchCriteria.languages +
          matchCriteria.roles +
          matchCriteria.salary;

        const percentMatch = Math.ceil(total * 100);

        return { id, matchCriteria, percentMatch };
      },
    );

    if (candidates.length) {
      await matchCandidatesQuery({ candidates, positionId });
    }

    // Allow time for the animation
    const t2 = new Date();
    const time = t2 - t1;
    const PromiseTimeout = delayms =>
      new Promise(resolve => {
        setTimeout(resolve, delayms);
      });
    if (time < 2000) await PromiseTimeout(2000 - time);

    return {
      __typename: 'Success',
      message: matchCandidatesSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || matchCandidatesError,
    };
  }
};

module.exports = matchCandidates;
