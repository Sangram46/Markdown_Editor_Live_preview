const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const marked = require('marked');  

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.post('/api/convert', (req, res) => {
  const { markdown: markdownText } = req.body;  

  if (!markdownText) {
    return res.status(400).json({ error: 'No markdown text provided' });
  }

  try {
   
    const htmlContent = marked.parse(markdownText);

    res.json({ html: htmlContent });
  } catch (error) {
    console.error('Error converting markdown:', error);
    res.status(500).json({ error: 'Failed to convert markdown' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
