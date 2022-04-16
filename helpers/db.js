const { createPool } = require("mysql2");

const pool = createPool({
  host: 'localhost',
  port: 3306,
  database: '',
  user: '',
  password: '',
});

pool.getConnection(error => {
  if(error) {
    console.log('Error connect to db')
  }
  console.log('Connected to db');
});

const excuteQuery = (query, arr) => {
  const promise = new Promise((resolve, reject) => {
    try {
      pool.query(query, arr, (err, data) => {
        if(err) {
          console.log('Error in executing query');
          reject(err);
        } 

        resolve(data);

      })
    } catch (error) {
      reject(error);
    }
  }) 

  return promise;
}


module.exports = { excuteQuery }; 