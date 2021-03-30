import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [gen, setGen] = useState(false)

  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
    setGen(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Palette Generator v1.0</h1>
          <div className={"Image-set-container"}>
            <div className={"Image-container"}>
              <img src={logo} className="App-logo" alt="logo" />
              <p>test</p>
            </div>
            <div className={"Image-container"}>
              <img src={logo} className="App-logo" alt="logo" />
              <p>test</p>
            </div>
            <div className={"Image-container"}>
              <img src={logo} className="App-logo" alt="logo" />
              <p>test</p>
            </div>
          </div>
        <button className="Generate-button" onClick={handleClick}>Generate new blocks</button>
      </header>
    </div>
  );
}

export default App;
