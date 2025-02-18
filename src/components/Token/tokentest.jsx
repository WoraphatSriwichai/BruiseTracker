import React, { useState } from 'react';

function TestTokenPage() {
  const [message, setMessage] = useState('');

  const testToken = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setMessage('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Success: ${data.message}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Test Token</h1>
      <button onClick={testToken}>Test Token</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TestTokenPage;