import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

// import LayoutDefault from '../pages/_layouts/Default';

import { useAuth } from '../hooks/auth';

import LayoutDefault from '../pages/_layout/Default';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isError?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  const isSigned = !!user;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === isSigned ? (
          !isSigned ? (
            <Component />
          ) : (
            <LayoutDefault>
              <Component />
            </LayoutDefault>
          )
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
