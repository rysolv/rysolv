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
      const { rows } = await client.query(queryText);
      // eslint-disable-next-line no-console
      console.table(rows);
    } catch (error) {
      client.release();
      throw error;
    }
  };
  await Promise.all(array.map(queryText => queryDB(queryText)));
  client.release();
};

// map array of values to a query
const mapValues = async (queryText, array) => {
  const client = await pool.connect();
  const results = [];
  const queryDB = async value => {
    try {
      const { rows } = await client.query(queryText, value);
      if (rows.length > 0) {
        results.push(rows[0]);
      }
    } catch (error) {
      client.release();
      throw error;
    }
  };
  await Promise.all(array.map(value => queryDB(value)));
  client.release();
  return results;
};

// single query (no data)
const singleQuery = async queryText => {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText);
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
  const { rows } = await singleQuery(queryText);
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
  const { rows } = await singleQuery(searchQuery);
  return rows;
};

// Sequential query for table creations
const sequentialQuery = async () => {
  // TODO: use this for DeleteTable and CreateTable
};

module.exports = {
  mapQuery,
  mapQueryPrint,
  mapValues,
  sequentialQuery,
  singleItem,
  singleQuery,
  singleSearch,
};
