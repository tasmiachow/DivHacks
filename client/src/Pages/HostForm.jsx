import { useState } from 'react'
import myLogo from './assets/LinkUp_NYC.png'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [location, setLocation] = useState('');
  const [option, setOption] = useState('cafe');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nCode: ${code}\nLocation: ${location}\nOption: ${option}`);
  };

  return (
    <div className="app-container">
      <header className="header">
        <img src={myLogo} className="logo" alt="LinkUp Logo" />
        <h1 className="tagline">Find your vibe, set your spot ✨</h1>
      </header>

      <main className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="text"
              placeholder="🔑 Party Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="👤 Host Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="input"
            />
          </div>

          <input
            type="text"
            placeholder="📍 Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            className="input wide-input"
          />

          <div className="options">
            <button
              type="button"
              className={`option-btn ${option === 'cafe' ? 'active' : ''}`}
              onClick={() => setOption('cafe')}
            >
              ☕ Cafe
            </button>
            <button
              type="button"
              className={`option-btn ${option === 'bus' ? 'active' : ''}`}
              onClick={() => setOption('bus')}
            >
              🚌 Bus
            </button>
          </div>

          <button type="submit" className="submit-btn">
            🚀 Let’s LinkUp
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
