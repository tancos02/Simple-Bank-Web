import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import Transfer from './transfer/Transfer';
import History from "./history/History";
// import History from './history/History';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/history" exact component={History}/>
            <Route path="/transfer" exact component={Transfer}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
  
  export default App;
