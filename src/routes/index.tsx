import React from 'react';
import { Switch } from 'react-router-dom';
import Brands from '../pages/Brands';
import Categories from '../pages/Categories';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Variations from '../pages/Products/Variations';
import VariationAdd from '../pages/Products/Variations/VariationAdd';
import VariationEdit from '../pages/Products/Variations/VariationEdit';
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
      <Route path="/brands" component={Brands} isPrivate />

      <Route path="/products" exact component={Products} isPrivate />
      <Route
        path="/products/:id/variations"
        exact
        component={Variations}
        isPrivate
      />
      <Route
        path="/products/:id/variations/create"
        exact
        component={VariationAdd}
        isPrivate
      />
      <Route
        path="/products/:id/variations/:slug"
        component={VariationEdit}
        isPrivate
      />

      <Route path="/profile" exact component={Products} isPrivate />
    </Switch>
  );
};

export default Routes;
