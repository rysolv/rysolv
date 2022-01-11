const { singleQuery } = require('../baseQueries');

// Generate initial list of skills
const skills = [
  {
    id: 'a5a5f885-5023-4964-8609-274bdd04008f',
    is_framework: false,
    is_language: true,
    name: 'Java',
    short_name: 'java',
  },
  {
    id: '8263dca0-5881-4d76-be02-e7a155863d7c',
    is_framework: false,
    is_language: true,
    name: 'JavaScript',
    short_name: 'javascript',
  },
  {
    id: 'badd4613-8f94-4d46-adb0-e79ed63f7d3f',
    is_framework: false,
    is_language: true,
    name: 'PHP',
    short_name: 'php',
  },
  {
    id: '76336e3b-85b5-42d9-a428-5d0e48717e1c',
    is_framework: false,
    is_language: true,
    name: 'Python',
    short_name: 'python',
  },
  {
    id: '66fa326a-6907-4bb2-b7dc-1fd82452d468',
    is_framework: false,
    is_language: true,
    name: 'Rust',
    short_name: 'rust',
  },
  {
    id: '354f4aee-676c-4d2b-baa3-fa14750d1e35',
    is_framework: true,
    is_language: false,
    name: 'React',
    short_name: 'react',
  },
  {
    id: '139d98a7-042e-4be2-843d-41fabb51e7c2',
    is_framework: true,
    is_language: false,
    name: 'React Native',
    short_name: 'react_native',
  },
];

const seedTechnologies = async () => {
  await Promise.all(
    skills.map(async el => {
      const queryText = `
      INSERT INTO technologies(
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

module.exports = { seedTechnologies };
