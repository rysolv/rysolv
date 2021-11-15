const { singleQuery } = require('../baseQueries');

// Generate initial list of questions
const questions = [
  // hiring
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
    subtext: 'Optional.',
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
    subtext: 'Optional.',
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
  // company_position
  // description
  {
    id: '34cc19c1-38e3-43b4-b0e7-5fac04bedec4',
    category: 'company_position',
    created_date: new Date(),
    priority: 6,
    question_key: 'description',
    question_text: 'Job description',
    required: false,
    response_limit: 1,
    subtext: null,
  },
  // experience
  {
    id: '5c7f171e-aecb-42e1-aad3-6f4f816e3e5b',
    category: 'company_position',
    created_date: new Date(),
    priority: 8,
    question_key: 'experience',
    question_text: 'Experience',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // is_open
  {
    id: 'd16765b2-8fd0-4fc7-80d2-b3c511338240',
    category: 'company_position',
    created_date: new Date(),
    priority: 9,
    question_key: 'is_open',
    question_text: 'Open',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // is_remote
  {
    id: '16499d8b-3d54-43ed-b9fb-58c8e99c9fb4',
    category: 'company_position',
    created_date: new Date(),
    priority: 5,
    question_key: 'is_remote',
    question_text: 'This position is remote',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // location
  {
    id: 'a25c9f54-b436-415e-adc5-72d6c8e5b595',
    category: 'company_position',
    created_date: new Date(),
    priority: 4,
    question_key: 'location',
    question_text: 'Location',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // role
  {
    id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    category: 'company_position',
    created_date: new Date(),
    priority: 2,
    question_key: 'role',
    question_text: 'Position role',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // salary
  {
    id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    category: 'company_position',
    created_date: new Date(),
    priority: 10,
    question_key: 'salary',
    question_text: 'Maximum salary',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // skills
  {
    id: '3a9bf308-d093-470f-ae48-1cc901772605',
    category: 'company_position',
    created_date: new Date(),
    priority: 7,
    question_key: 'skills',
    question_text: 'Skills',
    required: true,
    response_limit: 1,
    subtext:
      'Select the top five frameworks/languages that you require an engineer to know.',
  },
  // title
  {
    id: '68fb1f89-b92f-4f3a-9016-bdd1810f38c5',
    category: 'company_position',
    created_date: new Date(),
    priority: 1,
    question_key: 'title',
    question_text: 'Position title',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // type
  {
    id: '0bfa14b6-283d-4113-ab78-3fc21e21bcda',
    category: 'company_position',
    created_date: new Date(),
    priority: 3,
    question_key: 'type',
    question_text: 'Position type',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // company
  // description
  {
    id: '97e4b49d-b178-48ce-865f-c707ef48c0a5',
    category: 'company',
    created_date: new Date(),
    priority: 6,
    question_key: 'description',
    question_text: 'Description',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // location
  {
    id: '8b2245ce-709b-4e59-ac31-8a4af3359b89',
    category: 'company',
    created_date: new Date(),
    priority: 4,
    question_key: 'location',
    question_text: 'Location',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // logo
  {
    id: '7865a89d-4621-4c70-83ef-b4431123b95e',
    category: 'company',
    created_date: new Date(),
    priority: 1,
    question_key: 'logo',
    question_text: 'Company logo',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // name
  {
    id: '6fb3d210-6120-4fa1-8771-87d5a7172342',
    category: 'company',
    created_date: new Date(),
    priority: 2,
    question_key: 'name',
    question_text: 'Company name',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // size
  {
    id: 'e83bb9d4-0ef0-490c-8a09-e25a91d6d2ab',
    category: 'company',
    created_date: new Date(),
    priority: 5,
    question_key: 'size',
    question_text: 'Company size',
    required: true,
    response_limit: 1,
    subtext: null,
  },
  // website
  {
    id: 'c114925b-d250-456b-9745-98db88274670',
    category: 'company',
    created_date: new Date(),
    priority: 3,
    question_key: 'website',
    question_text: 'Company website',
    required: true,
    response_limit: 1,
    subtext: null,
  },
];

const responses = [
  // hiring
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
  // company_position
  // description
  {
    id: '8d342d18-d93c-4f9f-9b19-9fd98038a5c4',
    created_date: new Date(),
    priority: 1,
    question_id: '34cc19c1-38e3-43b4-b0e7-5fac04bedec4',
    response_key: 'position_description',
    value: '',
  },
  // experience
  {
    id: 'a2edf732-4d73-4014-8c29-9f4f8dc39538',
    created_date: new Date(),
    priority: 1,
    question_id: '5c7f171e-aecb-42e1-aad3-6f4f816e3e5b',
    response_key: 'junior_experience',
    value: 'Junior',
  },
  {
    id: 'a3fcab14-5fb7-46c4-8377-c1c1b5330838',
    created_date: new Date(),
    priority: 2,
    question_id: '5c7f171e-aecb-42e1-aad3-6f4f816e3e5b',
    response_key: 'middle_experience',
    value: 'Middle',
  },
  {
    id: '97847136-fc95-45cb-995f-e9e36a5e04f6',
    created_date: new Date(),
    priority: 3,
    question_id: '5c7f171e-aecb-42e1-aad3-6f4f816e3e5b',
    response_key: 'senior_experience',
    value: 'Senior',
  },
  // is_open
  {
    id: '6d664be8-8284-466a-82fb-5e5214a5763b',
    created_date: new Date(),
    priority: 1,
    question_id: 'd16765b2-8fd0-4fc7-80d2-b3c511338240',
    response_key: 'no_is_open',
    value: 'No',
  },
  {
    id: '2b585205-0224-46a6-bc97-90282797f3b7',
    created_date: new Date(),
    priority: 2,
    question_id: 'd16765b2-8fd0-4fc7-80d2-b3c511338240',
    response_key: 'yes_is_open',
    value: 'Yes',
  },
  // is_remote
  {
    id: '4f29a45e-c675-49c9-a3db-9d42221c278d',
    created_date: new Date(),
    priority: 1,
    question_id: '16499d8b-3d54-43ed-b9fb-58c8e99c9fb4',
    response_key: 'yes_is_remote',
    value: 'Yes',
  },
  {
    id: 'c6a297bd-a2e1-419b-a712-6dae96ce2f0b',
    created_date: new Date(),
    priority: 2,
    question_id: '16499d8b-3d54-43ed-b9fb-58c8e99c9fb4',
    response_key: 'no_is_remote',
    value: 'No',
  },
  // location
  {
    id: '88ae251b-bfe9-4397-998f-1a7b3c846fcf',
    created_date: new Date(),
    priority: 1,
    question_id: 'a25c9f54-b436-415e-adc5-72d6c8e5b595',
    response_key: 'location',
    value: '',
  },
  // role
  {
    id: '77e13dde-278a-4348-81c5-4a7b419bb49d',
    created_date: new Date(),
    priority: 1,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'front_end',
    value: 'Front End',
  },
  {
    id: '721b1471-fb81-437b-8563-3950819d46aa',
    created_date: new Date(),
    priority: 1,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'back_end',
    value: 'Back End',
  },
  {
    id: '1856edd4-f2c4-4172-b15b-9c00f2de439c',
    created_date: new Date(),
    priority: 2,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'android',
    value: 'Android',
  },
  {
    id: '4790677a-301e-4d0f-88f0-6e743ae99f22',
    created_date: new Date(),
    priority: 3,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'ios',
    value: 'iOS',
  },
  {
    id: '2694f6aa-6206-407c-8bab-69fcf0cdaffa',
    created_date: new Date(),
    priority: 4,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'devops',
    value: 'Devops',
  },
  {
    id: 'edbb7151-fbb8-40e4-a141-441b3c3a4ed4',
    created_date: new Date(),
    priority: 5,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'machine_learning',
    value: 'Machine Learning',
  },
  {
    id: '647e2d48-c8d7-4882-945b-4621e6817ab4',
    created_date: new Date(),
    priority: 6,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'firmware',
    value: 'Embedded/Firmware',
  },
  {
    id: 'b603100e-1d6a-48aa-bf9e-3ed5692f3c95',
    created_date: new Date(),
    priority: 7,
    question_id: 'c762dd74-eb92-4830-9f2a-31894a1e33c7',
    response_key: 'generalist',
    value: 'Generalist',
  },
  // salary
  {
    id: '4cde7a95-2599-4e57-988c-9ad70e9b3344',
    created_date: new Date(),
    priority: 1,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '75',
    value: '$75,000',
  },
  {
    id: 'd475580e-8597-4c56-a6ad-82a632cb17da',
    created_date: new Date(),
    priority: 2,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '100',
    value: '$100,000',
  },
  {
    id: '3bd4e819-32d7-4467-b9d9-30b9d5630e0c',
    created_date: new Date(),
    priority: 3,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '125',
    value: '$125,000',
  },
  {
    id: '03ac0f94-c87e-4c09-b47e-a0c8db83d8da',
    created_date: new Date(),
    priority: 4,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '150',
    value: '$150,000',
  },
  {
    id: 'dec059ac-40c3-4e3b-9ed5-e0c43a2b7afb',
    created_date: new Date(),
    priority: 5,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '175',
    value: '$175,000',
  },
  {
    id: 'fed87f96-32ff-4fce-a3b2-e35351f643fd',
    created_date: new Date(),
    priority: 6,
    question_id: 'c69a9f4b-d188-4c2f-9454-939d5483e905',
    response_key: '200',
    value: '$200,000',
  },
  // skills
  {
    id: '2f33245f-fd9e-48b6-ab0a-4abdc7154517',
    created_date: new Date(),
    priority: 1,
    question_id: '3a9bf308-d093-470f-ae48-1cc901772605',
    response_key: 'skills',
    value: '',
  },
  // title
  {
    id: '9652e19d-43f5-4445-86db-572c88c6d485',
    created_date: new Date(),
    priority: 1,
    question_id: '68fb1f89-b92f-4f3a-9016-bdd1810f38c5',
    response_key: 'title',
    value: '',
  },
  // type
  {
    id: 'e24d4938-c66e-4824-b268-3258ed545fd9',
    created_date: new Date(),
    priority: 1,
    question_id: '0bfa14b6-283d-4113-ab78-3fc21e21bcda',
    response_key: 'contractor',
    value: 'Contractor',
  },
  {
    id: 'a103a91e-3ef6-412f-9dc4-599e491179a1',
    created_date: new Date(),
    priority: 2,
    question_id: '0bfa14b6-283d-4113-ab78-3fc21e21bcda',
    response_key: 'full_time',
    value: 'Full-Time',
  },
  // company
  // description
  {
    id: '51c823d3-6961-45c4-85ee-3a13c4a9703d',
    created_date: new Date(),
    priority: 1,
    question_id: '97e4b49d-b178-48ce-865f-c707ef48c0a5',
    response_key: 'description',
    value: '',
  },
  // location
  {
    id: 'ef5428fa-8f93-4c90-9df7-4c34921343ce',
    created_date: new Date(),
    priority: 1,
    question_id: '8b2245ce-709b-4e59-ac31-8a4af3359b89',
    response_key: 'location',
    value: '',
  },
  // logo
  {
    id: 'fa60b24b-a632-4c37-8574-00473e88190a',
    created_date: new Date(),
    priority: 1,
    question_id: '7865a89d-4621-4c70-83ef-b4431123b95e',
    response_key: 'logo',
    value: '',
  },
  // name
  {
    id: '2f9d015f-974d-489e-a6e8-aeed96486c90',
    created_date: new Date(),
    priority: 1,
    question_id: '6fb3d210-6120-4fa1-8771-87d5a7172342',
    response_key: 'name',
    value: '',
  },
  // size
  {
    id: 'c0c12949-b98c-4b8e-a424-148b57f3e117',
    created_date: new Date(),
    priority: 1,
    question_id: 'e83bb9d4-0ef0-490c-8a09-e25a91d6d2ab',
    response_key: 'small_startup',
    value: '1 - 10',
  },
  {
    id: 'bfcddde9-d1c7-492a-91e2-fd6505627817',
    created_date: new Date(),
    priority: 2,
    question_id: 'e83bb9d4-0ef0-490c-8a09-e25a91d6d2ab',
    response_key: 'startup',
    value: '11 - 50',
  },
  {
    id: '4ec7075b-957f-4e25-8256-ebdf34e997f5',
    created_date: new Date(),
    priority: 3,
    question_id: 'e83bb9d4-0ef0-490c-8a09-e25a91d6d2ab',
    response_key: 'mid_sized',
    value: '51 - 250',
  },
  {
    id: 'b6d518c1-c812-4be9-a178-b80aa2392d29',
    created_date: new Date(),
    priority: 4,
    question_id: 'e83bb9d4-0ef0-490c-8a09-e25a91d6d2ab',
    response_key: 'large',
    value: '251 +',
  },
  // website
  {
    id: 'ffc15427-30ed-449e-a5ad-de9fce7781a9',
    created_date: new Date(),
    priority: 1,
    question_id: 'c114925b-d250-456b-9745-98db88274670',
    response_key: 'website',
    value: '',
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
      ON CONFLICT (id) DO UPDATE SET
        category = EXCLUDED.category,
        created_date = EXCLUDED.created_date,
        priority = EXCLUDED.priority,
        question_key = EXCLUDED.question_key,
        question_text = EXCLUDED.question_text,
        required = EXCLUDED.required,
        response_limit = EXCLUDED.response_limit,
        subtext = EXCLUDED.subtext
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
      ON CONFLICT (id) DO UPDATE SET
        created_date = EXCLUDED.created_date,
        priority = EXCLUDED.priority,
        question_id = EXCLUDED.question_id,
        response_key = EXCLUDED.response_key,
        value = EXCLUDED.value
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
