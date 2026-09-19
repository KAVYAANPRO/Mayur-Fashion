const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'Mayur-Fashion', 'dist');

// Serve static files from Mayur-Fashion/dist
app.use(express.static(distPath));

// For any route starting with /admin, serve the admin index.html
app.use('/admin', (req, res, next) => {
  res.sendFile(path.join(distPath, 'admin', 'index.html'));
});

// For all other routes, serve the main frontend index.html
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});
