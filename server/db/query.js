// single query (no data)
const singleQuery = async (pool, queryText) => {
  try {
    await pool.query(queryText);
  } catch (error) {
    pool.end();
    throw error;
  }
};

// Map array of queries
const mapQuery = async (pool, array) => {
  const queryDB = async queryText => {
    try {
      await pool.query(queryText);
    } catch (error) {
      pool.end();
      throw error;
    }
  };
  await Promise.all(array.map(queryText => queryDB(queryText)));
};

// map array of values to a query
const mapValues = async (pool, queryText, array) => {
  const queryDB = async value => {
    try {
      await pool.query(queryText, value);
    } catch (error) {
      pool.end();
      throw error;
    }
  };
  await Promise.all(array.map(value => queryDB(value)));
};

// map queries and print
const mapQueryPrint = async (pool, array) => {
  const queryDB = async queryText => {
    try {
      const { rows } = await pool.query(queryText);
      console.table(rows);
    } catch (error) {
      pool.end();
      throw error;
    }
  };
  await Promise.all(array.map(queryText => queryDB(queryText)));
};

module.exports = { mapQuery, mapQueryPrint, mapValues, singleQuery };
