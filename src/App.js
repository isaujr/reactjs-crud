import React from 'react';
// import logo from './logo.svg';
import Contatcs from './components/Contacts';
import './App.css';

function App() {
  return (
    <div className="row bg-dark">
      <div className="col-md-10 offset-md-1">
        <Contatcs />
      </div>
    </div>
  );
}

export default App;
