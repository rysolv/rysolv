const { singleQuery } = require('../baseQueries');

// Generate initial list of skills
const skills = [
  {
    id: 'a5a5f885-5023-4964-8609-274bdd04008f',
    is_framework: false,
    is_language: true,
    name: 'Java',
    short_name: 'Java',
  },
  {
    id: '8263dca0-5881-4d76-be02-e7a155863d7c',
    is_framework: false,
    is_language: true,
    name: 'JavaScript',
    short_name: 'JavaScript',
  },
  {
    id: 'badd4613-8f94-4d46-adb0-e79ed63f7d3f',
    is_framework: false,
    is_language: true,
    name: 'PHP',
    short_name: 'PHP',
  },
  {
    id: '76336e3b-85b5-42d9-a428-5d0e48717e1c',
    is_framework: false,
    is_language: true,
    name: 'Python',
    short_name: 'Python',
  },
  {
    id: '66fa326a-6907-4bb2-b7dc-1fd82452d468',
    is_framework: false,
    is_language: true,
    name: 'Rust',
    short_name: 'Rust',
  },
];

const seedSkills = async () => {
  await Promise.all(
    skills.map(async el => {
      const queryText = `
      INSERT INTO skills(
        id,
        is_framework,
        is_language,
        name,
        short_name
      )
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        is_framework = EXCLUDED.is_framework,
        is_language = EXCLUDED.is_language,
        name = EXCLUDED.name,
        short_name = EXCLUDED.short_name
    `;
      const values = [
        el.id,
        el.is_framework,
        el.is_language,
        el.name,
        el.short_name,
      ];
      await singleQuery({
        queryText,
        values,
      });
    }),
  );
};

module.exports = { seedSkills };
