import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { PageFile } from './PageFile';
import { PageModal } from './PageModal';
import { PageForm } from './PageForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={PageFile} />
        <Route path='/modal' component={PageModal} />
        <Route path='/form' component={PageForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;
