import React, { useState } from 'react';
import axios from 'axios';
const { GoogleGenerativeAI } = require("@google/generative-ai");



function App() {
  const [summary, setSummary] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');




  //DeepSeek API
  const handleSummarize = async (text) => {

    let data = JSON.stringify({
      "messages": [
        {
          "content": "You are a helpful assistant",
          "role": "system"
        },
        {
          "content": `لخص النص الاتي باللغة العربية وضع له عنوانا: ${text}`,
          "role": "user"
        }
      ],
      "model": "deepseek-chat",
      "response_format": {
        "type": "text"
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.deepseek.com/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer Why are you looking here????'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        const result = response.data.choices[0].message.content;
        setSummary(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="App" style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' }}>
        Arabic Text Summarizer
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Arabic text here..."
        rows={10}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          resize: 'vertical',
          minHeight: '150px',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#007bff';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 123, 255, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ddd';
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }}
      />

      <button
        onClick={() => handleSummarize(text)}
        disabled={loading}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          width: '100%',
          fontWeight: '600',
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1.02)';
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        {loading ? (
          <span>
            <span style={{ marginRight: '8px' }}>⏳</span> Summarizing...
          </span>
        ) : (
          'Summarize'
        )}
      </button>

      {error && (
        <p style={{ color: '#e74c3c', marginTop: '20px', textAlign: 'center', fontSize: '16px' }}>
          {error}
        </p>
      )}

      {text && (
        <div style={{ marginTop: '30px', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ color: '#34495e', marginBottom: '15px', fontSize: '24px', fontWeight: '600' }}>Text:</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>{text}</p>
        </div>
      )}

      {summary && (
        <div style={{ marginTop: '30px', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ color: '#34495e', marginBottom: '15px', fontSize: '24px', fontWeight: '600' }}>Summary:</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
