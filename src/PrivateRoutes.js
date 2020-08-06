import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from 'components';

export const AuthRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location.pathname }
          }}
        />
      )
    }
  />
);

export const NonauthRoute = ({
  component: Component,
  isAuthenticated,
  allowRedirect,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && allowRedirect ? (
        <Redirect
          to={props.location.state ? props.location.state.from : '/dashboard'}
        />
      ) : (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      )
    }
  />
);

AuthRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

NonauthRoute.propTypes = {
  component: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  allowRedirect: PropTypes.bool
};

NonauthRoute.defaultProps = {
  allowRedirect: false
};
