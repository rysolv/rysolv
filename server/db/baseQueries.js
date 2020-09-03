const pool = require('./connect');

// Map array of queries (no data)
const mapQuery = async array => {
  const client = await pool.connect();
  const queryDB = async queryText => {
    try {
      await client.query(queryText);
    } catch (error) {
      client.release();
      throw error;
    }
  };
  await Promise.all(array.map(queryText => queryDB(queryText)));
  client.release();
};

// map queries and print
const mapQueryPrint = async array => {
  const client = await pool.connect();
  const queryDB = async queryText => {
    try {
      const { fields } = await client.query(queryText);
      // eslint-disable-next-line no-console
      console.table(fields);
    } catch (error) {
      client.release();
      throw error;
    }
  };
  await Promise.all(array.map(queryText => queryDB(queryText)));
  client.release();
};

// Single Query. Accepts array of values for parameterized queries
const singleQuery = async ({ queryText, values }) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText, values);
    client.release();
    return result;
  } catch (error) {
    client.release();
    throw error;
  }
};

const singleItem = async (table, id, values, column = 'id') => {
  const queryValues = values || '*';
  const queryText = `SELECT ${queryValues} FROM ${table} WHERE (${column}='${id}')`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

const singleSearch = async (queryText, fields, value, param) => {
  const searchString = fields.reduce((acc, field) => {
    acc.push(`LOWER(${field}) LIKE LOWER('%${value}%')`);
    return acc;
  }, []);
  const formattedSearchString = searchString.join(' OR ');
  const searchParam = param ? `${param} AND ` : '';
  const searchQuery = `${queryText} WHERE ${searchParam}(${formattedSearchString})`;
  const { rows } = await singleQuery({ queryText: searchQuery });
  return rows;
};

module.exports = {
  mapQuery,
  mapQueryPrint,
  singleItem,
  singleQuery,
  singleSearch,
};
