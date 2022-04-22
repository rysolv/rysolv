/* eslint-disable no-unused-expressions */

/**
 * Match one candidate to one position
 * @param {Object} candidate
 * @param {Object} position
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

const matchCandidate = ({ candidate, position }) => {
  const {
    id,
    userLanguages,
    userLocation,
    userResponses,
    userRoles,
    userType,
  } = candidate;

  const {
    experience: reqExperience,
    location: reqLocation,
    roleKeys: reqRoles,
    salary: reqSalary,
    skills: reqLanguages,
    timezone: reqTimezone,
    type: reqType,
  } = position;

  // @todo move this into one destructure
  const {
    experience: userExperience,
    target_salary: userSalary,
    timezone: userTimezone,
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

  const candidateMatch = {};

  // ******************************* Check Location ************************************
  // Matching: location & timezone
  const { utcOffset: reqUtcOffset } = reqLocation;

  const { utcOffset: userUtcOffset } = userLocation;

  // User is within position's time preference
  let userLocationMatch = false;

  // Position is within the user's time preference
  let reqLocationMatch = false;

  const userTimezoneNum = Number(userTimezone);
  const reqTimezoneNum = Number(reqTimezone);
  const userTimezoneDifference = Math.abs((userUtcOffset - reqUtcOffset) / 60);

  if (userTimezoneNum >= userTimezoneDifference) {
    userLocationMatch = true;
  }
  if (reqTimezoneNum >= userTimezoneDifference) {
    reqLocationMatch = true;
  }

  if (userLocationMatch && reqLocationMatch) {
    candidateMatch.location = true;
  }

  // ******************************* Check Experience **********************************
  // Matching: senior_experience, '1 - 2 years', etc.
  // Return: true/false
  const expDictionary = {
    junior_experience: 0,
    midlevel_experience: 1,
    senior_experience: 2,
  };
  if (userExperience >= expDictionary[reqExperience]) {
    candidateMatch.experience = true;
  }

  // ******************************* Check Languages ***********************************
  // Matching: language, framworks
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

  candidateMatch.frameworks =
    matchCriteria.frameworks * (frameworkMatch / frameworkCount) || 0;

  candidateMatch.languages =
    matchCriteria.languages * (languageMatch / languageCount) || 0;

  // ******************************* Check Roles ***************************************
  // Matching: front_end, back_end, ios, etc.
  // Result: (# matching roles / reqRoles) * matchCriteria.roles
  const matchingRoles = reqRoles.map(el => (userRoles.includes(el) ? 1 : 0));
  const matchSum = matchingRoles.reduce((a, b) => a + b, 0);
  candidateMatch.roles = matchCriteria.roles * (matchSum / reqRoles.length);

  // ******************************* Check Position Type *******************************
  // Matching: userType:['full_time', 'contractor'], reqType: 'full_time'
  // Result: true/false
  if (userType.includes(reqType)) {
    candidateMatch.type = true;
  }

  // ******************************* Check Salary **************************************
  // userSal <= reqSal = 100%
  // (userSal - $25k) <= reqSal = 50%
  const salaryMatch = +userSalary <= +reqSalary;
  const salaryClose = +userSalary - 25 <= +reqSalary;

  if (salaryMatch) candidateMatch.salary = matchCriteria.salary * 1;
  else if (salaryClose) candidateMatch.salary = matchCriteria.salary * 0.5;
  else candidateMatch.salary = 0;

  // Sum numerical categories
  const total =
    candidateMatch.frameworks +
    candidateMatch.languages +
    candidateMatch.roles +
    candidateMatch.salary;

  const percentMatch = Math.ceil(total * 100);

  candidateMatch.frameworks /= matchCriteria.frameworks;
  candidateMatch.languages /= matchCriteria.languages;
  candidateMatch.roles /= matchCriteria.roles;
  candidateMatch.salary /= matchCriteria.salary;

  return { id, matchCriteria: candidateMatch, percentMatch };
};

module.exports = matchCandidate;
