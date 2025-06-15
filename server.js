const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the current directory
app.use(express.static('.'));

// Handle all routes by serving index.html if it exists
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file doesn't exist, try to serve index.html
      res.sendFile(path.join(__dirname, 'index.html'), (indexErr) => {
        if (indexErr) {
          res.status(404).send('File not found');
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});