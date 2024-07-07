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



app.delete('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  pool.query('DELETE FROM notes WHERE note_id = ?', [noteId], (error, result) => {
    if (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Error deleting note' });
    } else {
      console.log('Note deleted successfully');
      res.status(200).json({ message: 'Note deleted successfully' });
    }
  });
});



app.post('/notes', (req, res) => {
  const { note_title } = req.body;
  console.log(note_title)
  pool.query('INSERT INTO notes (note_title) VALUES (?)', [note_title ], (error, result) => {
      if (error) {
          console.error('Error adding note:', error);
          res.status(500).send('Error adding note');
      } else {
          const noteId = result.insertId;
          res.send(result); // Assuming redirect to home after note creation
      }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// models/db.js




