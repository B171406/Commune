const pool = require('../config/dbConfig');

const getNotes = (callback) => {
  const res=pool.query('SELECT *, CONVERT_TZ(created_at, \'+00:00\', \'+05:30\') AS ist_created_at FROM notes ORDER BY created_at DESC', callback);
  console.log(res)
};
module.exports = {
  getNotes
};

