import React from 'react';

//Styles
import './App.css';

//Components
import WeekContainer from './components/WeekContainer';

function App() {
  return (
    <div className="App">
      <h1 id="appTitle" className="mt-4">
        <b>5-Day Forecast</b>
      </h1>
      <WeekContainer />
    </div>
  );
}

export default App;
