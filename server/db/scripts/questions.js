const { singleQuery } = require('../baseQueries');

// Generate initial list of questions
const questions = [
  // experience
  {
    id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    category: 'hiring',
    created_date: new Date(),
    priority: 2,
    question_key: 'experience',
    question_text: 'How many years of experience do you have?',
    required: true,
    response_limit: 1,
    subtext: 'This can include educational and professional.',
  },
  // personal link
  {
    id: '1a859952-a666-46f1-80be-7444261486da',
    category: 'hiring',
    created_date: new Date(),
    priority: 9,
    question_key: 'personal_link',
    question_text: 'What is your personal website?',
    required: false,
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
    required: true,
    response_limit: 3,
    subtext: 'Select up to 3 languages.',
  },
  // preferred location
  {
    id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    category: 'hiring',
    created_date: new Date(),
    priority: 3,
    question_key: 'preferred_location',
    question_text: 'What is your preferred location?',
    required: true,
    response_limit: 6,
    subtext: 'Select as many as apply.',
  },
  // resume
  {
    id: 'dcf6d0db-b443-48e7-a637-c1679590d184',
    category: 'hiring',
    created_date: new Date(),
    priority: 8,
    question_key: 'resume',
    question_text: 'Upload your resume.',
    required: false,
    response_limit: 1,
    subtext: null,
  },
  // specialty
  {
    id: 'eb292e4a-96f8-444e-953c-f29f726abd6e',
    category: 'hiring',
    created_date: new Date(),
    priority: 5,
    question_key: 'desired_role',
    question_text: 'What is your desired role?',
    required: true,
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
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // timeline
  {
    id: '71401a1a-54bc-4816-a6b1-2e2679b57b4b',
    category: 'hiring',
    created_date: new Date(),
    priority: 7,
    question_key: 'timeline',
    question_text: 'How soon are you looking to be hired?',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // us citizen
  {
    id: 'a1c3ce83-14fc-405f-9888-3fa20d5acd72',
    category: 'hiring',
    created_date: new Date(),
    priority: 1,
    question_key: 'us_citizen',
    question_text: 'Are you a US citizen?',
    required: true,
    response_limit: 1,
    subtext: null,
  },
];

const responses = [
  // experience
  {
    id: '0f49a4a1-4ce2-4a7a-a3f1-8c45f22342dc',
    created_date: new Date(),
    priority: 1,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: '0',
    value: 'Less than 1 year',
  },
  {
    id: 'a37ee7fc-8101-4bb4-ab97-88f80d3924ad',
    created_date: new Date(),
    priority: 2,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: '1',
    value: '1 to 2 years',
  },
  {
    id: '80ae4b39-ee0c-4aa7-986f-79e196ab51f3',
    created_date: new Date(),
    priority: 3,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: '2',
    value: '2 to 5 years',
  },
  {
    id: '12630854-e30e-400d-8697-f23a61fc6792',
    created_date: new Date(),
    priority: 4,
    question_id: '4bef1f37-f09b-4515-a483-047faa0758cd',
    response_key: '5',
    value: 'More than 5 years',
  },
  // personal link
  {
    id: '96b9ad3d-ed3b-421e-abf8-4ffd22695c61',
    created_date: new Date(),
    priority: 1,
    question_id: '1a859952-a666-46f1-80be-7444261486da',
    response_key: 'personal_link',
    value: '',
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
  {
    id: 'bcc8a483-6e32-4aeb-96d6-5e84382337ac',
    created_date: new Date(),
    priority: 6,
    question_id: '29a29e9c-798e-4dd1-a8a3-c9029e5b9020',
    response_key: 'remote',
    value: 'Remote',
  },
  // resume
  {
    id: 'f831f54f-d964-411c-abb1-68137b705aa0',
    created_date: new Date(),
    priority: 1,
    question_id: 'dcf6d0db-b443-48e7-a637-c1679590d184',
    response_key: 'resume',
    value: '',
  },
  // specialty
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
  // timeline
  {
    id: '2abcd529-6fb2-40c3-8969-d7990568b95d',
    created_date: new Date(),
    priority: 1,
    question_id: '71401a1a-54bc-4816-a6b1-2e2679b57b4b',
    response_key: '0_months',
    value: 'Immediately',
  },
  {
    id: '0c553a85-d783-4184-8453-fb8e99a659a7',
    created_date: new Date(),
    priority: 2,
    question_id: '71401a1a-54bc-4816-a6b1-2e2679b57b4b',
    response_key: '3_months',
    value: 'Next 3 months',
  },
  {
    id: '6ba61893-6451-41ea-a0fd-5c03d8bf1d88',
    created_date: new Date(),
    priority: 3,
    question_id: '71401a1a-54bc-4816-a6b1-2e2679b57b4b',
    response_key: '6_months',
    value: 'Next 6 months',
  },
  {
    id: 'cf3a4da5-7f80-4c36-9c6e-4c84bdb812bf',
    created_date: new Date(),
    priority: 4,
    question_id: '71401a1a-54bc-4816-a6b1-2e2679b57b4b',
    response_key: 'indefinite',
    value: 'Not actively looking',
  },
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
        required,
        response_limit,
        subtext
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
      const values = [
        el.category,
        el.created_date,
        el.id,
        el.priority,
        el.question_key,
        el.question_text,
        el.required,
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
