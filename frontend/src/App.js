import React, { useState } from 'react';
import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(''); 
  const [html, setHtml] = useState(''); 

  // Handle markdown input change
  const handleMarkdownChange = async (event) => {
    const text = event.target.value;
    setMarkdown(text); 

    try {
      const response = await axios.post('http://localhost:5000/api/convert', {
        markdown: text,
      });

      setHtml(response.data.html);
    } catch (error) {
      console.error('Error converting markdown:', error);
    }
  };

  return (
    <div className="App">
      <h1>Markdown to Live HTML Converter</h1>

      <textarea
        className="markdown-editor"
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Start typing markdown..."
      />
      
      <div className="live-preview">
        <pre>
          <code>{html}</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
