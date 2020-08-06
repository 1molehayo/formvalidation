import React, { useState, useEffect, lazy } from 'react';
import { Router, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthRoute, NonauthRoute } from 'PrivateRoutes';
import history from './history';

const Home = lazy(() => import('pages/Home'));
const FormPage = lazy(() => import('pages/FormPage'));
const Page = lazy(() => import('pages/Page'));

const Scroll = props => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return props.children;
};

Scroll.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const ScrollToTop = withRouter(Scroll);

const RouterComponent = () => {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('name');
    if (data) {
      setAuth(true);
    }
  }, []);

  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <NonauthRoute
            exact
            path="/"
            allowRedirect
            isAuthenticated={isAuthenticated}
            component={FormPage}
          />

          <AuthRoute
            exact
            path="/welcome"
            isAuthenticated={isAuthenticated}
            component={Home}
          />

          <NonauthRoute
            exact
            path="/page"
            isAuthenticated={isAuthenticated}
            component={Page}
          />

          {/* <Route
            exact
            path="/"
            render={routeProps => (
              <Suspense fallback={<Loader show />}>
                <FormPage {...routeProps} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/welcome"
            render={routeProps => (
              <Suspense fallback={<Loader show />}>
                <Home {...routeProps} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/page"
            render={routeProps => (
              <Suspense fallback={<Loader show />}>
                <Page {...routeProps} />
              </Suspense>
            )}
          /> */}
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default RouterComponent;
