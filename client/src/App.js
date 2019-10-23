import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Info from './components/Info';
import Fib from './components/Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="ui center aligned container">
          <div className="ui secondary menu">
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/about" className="item">
              About
            </Link>
          </div>
          <div class="ui divider"></div>
          <h1 className="ui icon header" id="title">
            <i className="settings icon"></i>
            <div className="contents">Fancy Fibonacci App</div>
          </h1>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/about" component={Info} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
