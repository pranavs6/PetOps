import React, { useState } from 'react';

function Pump() {
  const [inputValue, setInputValue] = useState('');

  const handlePump = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_BASE_URL}:5000/pump`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: inputValue }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter litres to pump"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ backgroundColor: '#F1FFFA', marginBottom: '10px', padding: '8px', borderRadius: '10px', width: '200px' }}
      />
      <button
        onClick={handlePump}
        style={{ backgroundColor: '#9F6BA0', color: 'white', padding: '8px 15px', borderRadius: '10px', width: '100px', marginLeft: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
      >
        PUMP
      </button>
    </div>
  );
}

function Push() {
  const [inputValue, setInputValue] = useState('');

  const handlePush = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_BASE_URL}:5000/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: inputValue }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter grams to push"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ backgroundColor: '#F1FFFA', marginBottom: '10px', padding: '8px', borderRadius: '10px', width: '200px' }}
      />
      <button
        onClick={handlePush}
        style={{ backgroundColor: '#9F6BA0', color: 'white', padding: '8px 15px', borderRadius: '10px', width: '100px', marginLeft: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
      >
        PUSH
      </button>
    </div>
  );
}

export default function App() {
  const [videoSrc, setVideoSrc] = useState(`http://${process.env.REACT_APP_BASE_URL}:5000/video`);

  return (
    <div style={{ backgroundColor: '#233D4D', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '640px', height: '480px', border: '10px solid #4EA5D9', borderRadius: '10px', overflow: 'hidden', margin: '0.75in auto' }}>
        <iframe
          src={videoSrc}
          width="1280"
          height="720"
          style={{ border: 'none', width: '100%', height: '100%', objectFit: 'fill' }}
          allowFullScreen
          allow="autoplay"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ marginRight: '10px' }}>
          <h1 style={{ color: '#F1FFFA', fontFamily: 'Arial, sans-serif', fontSize: '24px', marginBottom: '10px' }}>Push food</h1>
          <Push />
        </div>
        <div>
          <h1 style={{ color: '#F1FFFA', fontFamily: 'Arial, sans-serif', fontSize: '24px', marginBottom: '10px' }}>Pump liquid</h1>
          <Pump />
        </div>
      </div>
    </div>
  );
}
