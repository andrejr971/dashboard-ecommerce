import React from 'react';
import { Switch } from 'react-router-dom';
import Categories from '../pages/Categories';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import SignIn from '../pages/SignIn';
import Users from '../pages/Users';
import Route from './Routes';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />

      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/users" component={Users} isPrivate />
      <Route path="/categories" component={Categories} isPrivate />

      <Route path="/products" exact component={Products} isPrivate />
      <Route path="/products/:id" exact component={Products} isPrivate />
      <Route
        path="/products/:id/variations"
        exact
        component={Products}
        isPrivate
      />
      <Route
        path="/products/:id/variations/:id"
        exact
        component={Products}
        isPrivate
      />

      <Route path="/profile" exact component={Products} isPrivate />
    </Switch>
  );
};

export default Routes;
