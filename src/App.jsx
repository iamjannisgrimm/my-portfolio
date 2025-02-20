import React from 'react';
import { Home } from './pages/Home';

console.log("OpenAI API Key:", import.meta.env.VITE_OPENAI_API_KEY); // For Vite

function App() {
  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh", minHeight: "100vh", boxSizing: "border-box" }}>
      <Home />
      
    </div>
  );
}

export default App;