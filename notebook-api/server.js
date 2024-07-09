const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notebook',
  connectionLimit: 10
});
JWT_SECRET = '57db1a24a061ed03043ca809c61f788261d12c24bb42e27abb5f5643a7cf4f175da8e7893732aebf1fb637a3b5c35459abf0162391d2f12ced63d754be315e2c';
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



app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert user into the database
        pool.query('INSERT INTO users (name, mail, password) VALUES (?, ?, ?)', [`${firstName} ${lastName}`, email, hashedPassword], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Registration failed. Please try again later.' });
          } else {
              // Create JWT token for user authentication
              
              const accessToken = jwt.sign({ usermail: email }, JWT_SECRET );
              res.json({ accessToken: accessToken });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/login', async (req, res) => {
  const {email, password } = req.body;
  try {
      // Query user from database by username
      pool.query('SELECT * FROM users WHERE mail = ?', [email], async (error, results) => {
          if (error) {
              console.log(error);
              return res.status(500).json({ error: 'Internal Server Error' });
          } else if (results.length > 0) {
              const user = results[0];
              const passwordMatch = await bcrypt.compare(password, user.password);
              if (passwordMatch) {
                  // Create JWT token for user authentication
                  const accessToken = jwt.sign({ usermail: email }, JWT_SECRET );
                  res.json({ accessToken: accessToken });
              } else {
                  // Incorrect password
                  res.status(401).json({ error: 'Authentication failed. Check your credentials.' });
              }
          } else {
              // User not found
              res.status(404).json({ error: 'User not found' });
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/messages/note_id/:note_id', (req, res) => {
  const noteId = Number(req.params.note_id);
  console.log(noteId)
  const query = 'SELECT *, CONVERT_TZ(sent_at, \'+00:00\', \'+05:30\') AS ist_sent_at FROM messages WHERE note_id = ?';

  pool.query(query, [noteId], (err, results) => {
      if (err) {
          console.error('Error fetching messages:', err);
          return res.status(500).json({ error: 'Error fetching messages' });
      }

      // Map over results to replace sent_at with ist_sent_at
      const messages = results.map(message => {
          return {
              ...message,
              sent_at: message.ist_sent_at // Replace sent_at with IST timestamp
          };
      });

      res.json(messages);
  });
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// models/db.js
