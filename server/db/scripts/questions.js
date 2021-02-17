const { singleQuery } = require('../baseQueries');

// Generate initial list of questions
const questions = [
  // us citizen
  {
    id: 'a1c3ce83-14fc-405f-9888-3fa20d5acd72',
    category: 'hiring',
    created_date: new Date(),
    priority: 1,
    question_key: 'us_citizen',
    question_text: 'Are you a US citizen?',
    response_limit: 1,
    subtext: null,
  },
  // remote ok
  {
    id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    category: 'hiring',
    created_date: new Date(),
    priority: 2,
    question_key: 'remote',
    question_text: 'Are you looking for a remote only position?',
    response_limit: 1,
    subtext: 'Many remote positions are expected to return to offices in 2021.',
  },
  // preferred location
  {
    id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    category: 'hiring',
    created_date: new Date(),
    priority: 3,
    question_key: 'preferred_location',
    question_text: 'What is your preferred location?',
    response_limit: 5,
    subtext: 'Select as many as apply.',
  },
  // specialty
  {
    id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    category: 'hiring',
    created_date: new Date(),
    priority: 5,
    question_key: 'desired_role',
    question_text: 'What is your desired role?',
    response_limit: 3,
    subtext: 'Select up to 3 roles.',
  },
  // target salary
  {
    id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    category: 'hiring',
    created_date: new Date(),
    priority: 6,
    question_key: 'target_salary',
    question_text: 'What is your target salary?',
    response_limit: 1,
    subtext: null,
  },
  // preferred languages
  {
    id: '7d62997d-16a7-43aa-a8af-3120cfb95b28',
    category: 'hiring',
    created_date: new Date(),
    priority: 4,
    question_key: 'preferred_languages',
    question_text: 'What are your strongest languages?',
    response_limit: 3,
    subtext: 'Select up to 3 languages.',
  },
];

const responses = [
  // us citizen
  {
    id: '8d9d7dfc-1487-4f4a-9cee-edb9836e0d06',
    created_date: new Date(),
    priority: 1,
    question_id: 'a1c3ce83-14fc-405f-9888-3fa20d5acd72',
    response_key: 'yes_us_citizen',
    value: 'Yes',
  },
  {
    id: '8d342d18-d93c-4f9f-9b19-9fd98038a5c4',
    created_date: new Date(),
    priority: 2,
    question_id: 'a1c3ce83-14fc-405f-9888-3fa20d5acd72',
    response_key: 'no_us_citizen',
    value: 'No',
  },
  // remote ok
  {
    id: '0f49a4a1-4ce2-4a7a-a3f1-8c45f22342dc',
    created_date: new Date(),
    priority: 1,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: 'yes_remote',
    value: 'Yes',
  },
  {
    id: 'a37ee7fc-8101-4bb4-ab97-88f80d3924ad',
    created_date: new Date(),
    priority: 2,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: 'no_remote',
    value: 'No',
  },
  // preferred locations
  {
    id: '399d5ac5-740c-419d-9e96-34e2c83ddd19',
    created_date: new Date(),
    priority: 1,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'san_francisco',
    value: 'San Francisco, CA',
  },
  {
    id: 'a35bef6e-d0a6-4068-b218-ddffebeab0c7',
    created_date: new Date(),
    priority: 2,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'boston',
    value: 'Boston, MA',
  },
  {
    id: 'a8c2ad6e-a32f-494b-ae14-ca3128618a4e',
    created_date: new Date(),
    priority: 3,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'new_york',
    value: 'New York, NY',
  },
  {
    id: '1bde2cb8-fbef-435a-8fbf-111525dc55b5',
    created_date: new Date(),
    priority: 4,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'austin',
    value: 'Austin, TX',
  },
  {
    id: '09aeafcd-6847-4487-aaa3-73728345a368',
    created_date: new Date(),
    priority: 5,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'seattle',
    value: 'Seattle, WA',
  },
  // Specialty
  {
    id: '1f7cdcee-33ae-4c21-8269-e76566a98f58',
    created_date: new Date(),
    priority: 1,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'front_end',
    value: 'Front End',
  },
  {
    id: '367ca730-9f5f-4890-b276-d989767fa965',
    created_date: new Date(),
    priority: 2,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'back_end',
    value: 'Back End',
  },
  {
    id: '39bfff94-7dbc-437f-b032-00c802cdfb9a',
    created_date: new Date(),
    priority: 3,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'android',
    value: 'Android',
  },
  {
    id: 'be8f18ee-c6bd-4a39-ac84-22bed46b42fe',
    created_date: new Date(),
    priority: 4,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'ios',
    value: 'iOS',
  },
  {
    id: '9920364c-f718-48f6-a260-98a8aa8c82de',
    created_date: new Date(),
    priority: 5,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'devops',
    value: 'Devops',
  },
  {
    id: 'a971f55c-19d6-4e3d-b56d-91c983d8996c',
    created_date: new Date(),
    priority: 6,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'machine_learning',
    value: 'Machine Learning',
  },
  {
    id: 'b6925870-a63a-4e90-8edd-83ed84d325dd',
    created_date: new Date(),
    priority: 7,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'firmware',
    value: 'Embedded/Firmware',
  },
  {
    id: '25977afb-930e-44c4-8361-6db8baab4dbc',
    created_date: new Date(),
    priority: 8,
    question_id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    response_key: 'generalist',
    value: 'Generalist',
  },
  // target salary
  {
    id: '8e79d387-a15a-4b6b-af4b-33ff17e7d892',
    created_date: new Date(),
    priority: 1,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '75',
    value: '$75,000 +',
  },
  {
    id: 'ef9a6743-9711-4e73-9d79-364c76ba374d',
    created_date: new Date(),
    priority: 2,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '100',
    value: '$100,000 +',
  },
  {
    id: '2fc18a45-e807-49cd-9003-3bf0912a90c8',
    created_date: new Date(),
    priority: 3,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '125',
    value: '$125,000 +',
  },
  {
    id: '4e1d1560-82bd-4fe2-b7c9-37be865534e3',
    created_date: new Date(),
    priority: 4,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '150',
    value: '$150,000 +',
  },
  {
    id: 'dd7a67a7-54df-491a-9a9b-a980b27b9f65',
    created_date: new Date(),
    priority: 5,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '175',
    value: '$175,000 +',
  },
  {
    created_date: new Date(),
    id: '10d0c56c-b652-41cc-9beb-bbd6733f28cf',
    priority: 6,
    question_id: '32eee9df-e3f8-4288-9671-d69981c6554d',
    response_key: '200',
    value: '$200,000 +',
  },
];

const seedQuestions = async () => {
  await Promise.all(
    questions.map(async el => {
      const queryText = `
      INSERT INTO questions(
        category,
        created_date,
        id,
        priority,
        question_key,
        question_text,
        response_limit,
        subtext
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    `;
      const values = [
        el.category,
        el.created_date,
        el.id,
        el.priority,
        el.question_key,
        el.question_text,
        el.response_limit,
        el.subtext,
      ];
      await singleQuery({
        queryText,
        values,
      });
    }),
  );
};

const seedResponses = async () => {
  await Promise.all(
    responses.map(async el => {
      const queryText = `
      INSERT INTO question_responses(
        created_date,
        id,
        priority,
        question_id,
        response_key,
        value
      )
      VALUES($1, $2, $3, $4, $5, $6)
    `;
      const values = [
        el.created_date,
        el.id,
        el.priority,
        el.question_id,
        el.response_key,
        el.value,
      ];
      await singleQuery({
        queryText,
        values,
      });
    }),
  );
};

module.exports = { seedQuestions, seedResponses };
