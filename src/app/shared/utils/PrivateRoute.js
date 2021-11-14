import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({
  component: Component,
  guard,
  redirectTo,
  ...rest
}) => {
  const _render = props =>
    guard() ? <Redirect to={redirectTo} /> : <Component {...props} />;

  return <Route {...rest} render={_render} />;
};
