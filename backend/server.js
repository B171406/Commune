const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notebook',
  connectionLimit: 10
});
if(!pool){
  console.log("err")
}
else{
  console.log("suc")
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




app.get('/notes', (req, res) => {
  pool.query('SELECT *, CONVERT_TZ(created_at, \'+00:00\', \'+05:30\') AS ist_created_at FROM notes ORDER BY created_at DESC', (err, results) => {
      if (err) {
          console.error('Error fetching notes:', err);
          res.status(500).json({ error: 'Error fetching notes' });
      } else {
          // Map over results to replace created_at with ist_created_at
          const notes = results.map(note => {
              return {
                  ...note,
                  created_at: note.ist_created_at // Replace created_at with IST timestamp
              };
          });
          res.json(notes);
      }
  });
});








app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// models/db.js




