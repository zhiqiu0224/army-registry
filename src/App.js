import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Add from './components/add';
import Edit from './components/edit';


class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/add' component={Add} />
          <Route path='/edit' component={Edit} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
