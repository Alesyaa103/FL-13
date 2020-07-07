import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainPage from '../../components/MainPage';
import Form from '../../components/Form';

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/form" component={Form}/>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routing