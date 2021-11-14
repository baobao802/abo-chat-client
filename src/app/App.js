import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import OverallLayout from './shared/components/OverallLayout';
import Home from './features/home';
import Auth from './features/auth';
import { PrivateRoute } from './shared/utils/PrivateRoute';
import { selectUserLoggedIn } from './shared/store/auth/authSlice';

function App() {
  const logged = useSelector(selectUserLoggedIn);

  return (
    <Router>
      <OverallLayout>
        <Switch>
          <Route exact path="/login" component={Auth} />
          <PrivateRoute
            exact
            path="/"
            redirectTo="/login"
            guard={() => !logged}
            component={Home}
          />
        </Switch>
      </OverallLayout>
    </Router>
  );
}

export default App;
