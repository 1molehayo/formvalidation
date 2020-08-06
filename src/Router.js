import React, { lazy } from 'react';
import { Router, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthRoute, NonauthRoute } from 'PrivateRoutes';
import { Loader } from 'components';
import { useAuth } from 'utility/useAuth';
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
  const { loggedIn, loading } = useAuth();

  return loading ? (
    <Loader show />
  ) : (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <NonauthRoute
            exact
            path="/"
            allowRedirect
            isAuthenticated={loggedIn}
            component={FormPage}
          />

          <AuthRoute
            exact
            path="/welcome"
            isAuthenticated={loggedIn}
            component={Home}
          />

          <NonauthRoute
            exact
            path="/page"
            isAuthenticated={loggedIn}
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
