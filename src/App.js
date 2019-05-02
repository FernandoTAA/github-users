import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import User from './components/User';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
