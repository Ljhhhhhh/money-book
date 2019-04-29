<<<<<<< HEAD
import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Create from './containers/Create'

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
=======
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home'
>>>>>>> d4767afc2104899f080563cc0416843996e00145

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/edit/10">Edit</Link>
        </ul>
        <div className="container pb-5">
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit/:id" component={Create} />
        </div>
      </div>
    </Router>
  );
}

export default App;
