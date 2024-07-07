const noteModel = require('../models /noteModel');

const getNotes = (req, res) => {
  noteModel.getNotes((err, results) => {
    console.log(results)
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).json({ error: 'Error fetching notes' });
    } else {
      // Map over results to replace created_at with IST timestamp
      const notes = results.map(note => ({
        ...note,
        created_at: note.ist_created_at // Replace created_at with IST timestamp
      }));
      console.log(results)
      res.json(notes);
    }
  });
};

module.exports = {
  getNotes
};
