const express = require('express');
const WebSocket = require('ws');
const { createPool } = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Anu@6413',
  database: 'notebook',
  connectionLimit: 10,
  charset: 'utf8mb4'
});
JWT_SECRET = '57db1a24a061ed03043ca809c61f788261d12c24bb42e27abb5f5643a7cf4f175da8e7893732aebf1fb637a3b5c35459abf0162391d2f12ced63d754be315e2c';
if (!pool) {
  console.log("Naveen")
}
else {
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
  pool.query('INSERT INTO notes (note_title) VALUES (?)', [note_title], (error, result) => {
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
    const user = {
      name: firstName + "" + lastName,
      mail: email,
      password: hashedPassword,
    }

    // Insert user into the database
    pool.query('INSERT INTO users (name, mail, password) VALUES (?, ?, ?)', [`${firstName} ${lastName}`, email, hashedPassword], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Registration failed. Please try again later.' });
      } else {
        // Create JWT token for user authentication

        const accessToken = jwt.sign({ usermail: email }, JWT_SECRET);
        res.json({ accessToken: accessToken, user: user });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
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
          const accessToken = jwt.sign({ usermail: email }, JWT_SECRET);
          res.json({ accessToken: accessToken, user: user });
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


app.post('/messages/note_id/:note_id', async (req, res) => {
  const noteId = Number(req.params.note_id);
  const { entermessage } = req.body;
  console.log("noteid", noteId);
  console.log("message", entermessage)

  try {
    pool.query('INSERT INTO messages (note_id, message_content) VALUES (?, ?)', [noteId, entermessage], (error, result) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send('Error');
      } else {
        console.log('Message added successfully');
        res.status(200).send('Message added successfully');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});



// Assuming you have an express app set up

app.post('/lastmodified/note_id/:note_id', async (req, res) => {
  const noteId = Number(req.params.note_id);
  const { sent_at } = req.body;
  console.log(noteId)
  console.log(sent_at)
  try {
    pool.query('UPDATE notes SET created_at = ? WHERE note_id = ?', [sent_at, noteId],(error, result) => {
      if(error) {
        console.error('Error:', error);
        res.status(500).send('Error');
      } else {
        console.log('Message added successfully');
        res.status(200).send('Message added successfully');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }

});





app.post('/chats', (req, res) => {
  const { chat_name,user_id } = req.body;
  pool.query('INSERT INTO Chats (chat_name,user_id) VALUES (?,?)', [chat_name,user_id], (error, result) => {
    if (error) {
      console.error('Error adding note:', error);
      res.status(500).send('Error adding note');
    } else {
      const noteId = result.insertId;
      res.send(result); // Assuming redirect to home after note creation
    }
  });
});



app.get('/chats/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  const query = 'SELECT *, CONVERT_TZ(created_at, \'+00:00\', \'+05:30\') AS ist_created_at FROM Chats WHERE user_id = ? ORDER BY created_at DESC';

  pool.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching chats:', err);
      return res.status(500).json({ error: 'Error fetching chats' });
    }
    res.json(results);
  });
});


app.delete('/chats/:note_id', (req, res) => {
  const chatId = req.params.note_id;
  pool.query('DELETE FROM Chats WHERE id = ?', [chatId], (error, result) => {
    if (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Error deleting note' });
    } else {
      console.log('Note deleted successfully');
      res.status(200).json({ message: 'Note deleted successfully' });
    }
  });
});



app.get('/messages/user_id/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const sql = 'SELECT * FROM Messages WHERE user_id = ? ';

  pool.query(sql, [user_id], (error, results) => {
      if (error) {
          console.error('Error fetching messages:', error);
          return res.status(500).send('Error fetching messages');
      }
      res.json(results);
  });
});



app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});


app.get('/users/mail/:email', (req, res) => {
  const userEmail = req.params.email;

  // Query to select user by email
  const query = 'SELECT * FROM users WHERE mail = ?';

  pool.query(query, [userEmail], (err, results) => {
    if (err) {
      console.error('Error selecting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send the user data as JSON response
  });
});



// Express route to fetch chat history between users
app.get('/messages/:senderId/:recipientId', (req, res) => {
  const { senderId, recipientId } = req.params;
  const sql = `
      SELECT *, CONVERT_TZ(timestamp, \'+00:00\', \'+05:30\') AS ist_timestamp FROM text 
      WHERE (sender_id = ? AND receiver_id = ?) 
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY timestamp ASC
  `;
  pool.query(sql, [senderId, recipientId, recipientId, senderId], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error fetching messages' });
      }
      // console.log(result)
      res.json(result);
  });
});

// Express.js example
app.put('/chats/:chatId/update-time', async (req, res) => {
  // const { chatId } = req.params;
  const { senderName,receiverName } = req.body; // You might need to use this for validation
  

  try {
      await pool.query('UPDATE Chats SET updated_at = CURRENT_TIMESTAMP WHERE chat_name IN (?, ?)', [senderName,receiverName]);
      res.status(200).send('Updated chat timestamp');
  } catch (error) {
      console.error('Error updating chat timestamp:', error);
      res.status(500).send('Server error');
  }
});



const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// WebSocket server

const wss = new WebSocket.Server({server  });


const users = {}; // Store user connections

wss.on('connection', (ws) => {
    let userId; // Store the userId for this connection

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'SET_USER_ID') {
            userId = data.userId;
            console.log(`User connected: ${userId}`);
            
            // Initialize the user array if it doesn't exist
            if (!users[userId]) {
                users[userId] = [];
            }
            users[userId].push(ws); // Store WebSocket connection for the user

        } else if (data.type === 'SEND_MESSAGE') {
            const { message: msg, recipientId, senderId } = data;

            // Store message in the database
            const sql = 'INSERT INTO text (sender_id, receiver_id, message) VALUES (?, ?, ?)';
            pool.query(sql, [senderId, recipientId, msg], (err) => {
                if (err) {
                    console.error('Error saving message:', err);
                }
            });

            // Send message to recipient
            if (users[recipientId]) {
                users[recipientId].forEach(client => {
                    client.send(JSON.stringify({
                        message: msg,
                        senderId
                    }));
                });
            } else {
                console.log(`User ${recipientId} is not connected.`);
            }
        }
    });

    ws.on('close', () => {
        if (userId && users[userId]) {
            // Remove the connection from the user's list
            users[userId] = users[userId].filter(client => client !== ws);
            console.log(`User disconnected: ${userId}`);
            if (users[userId].length === 0) {
                delete users[userId]; // Delete the user entry if no connections remain
            }
        }
    });
});


console.log('WebSocket server is running on ws://localhost:5000');



// Start the server