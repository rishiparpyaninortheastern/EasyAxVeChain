import { Route, Navigate } from "react-router-dom";

function GuardedRoute({ userId, element, ...rest }) {
  if (!userId) {
    // Redirect to the home page (or a login page) if `userId` doesn't exist.
    return <Navigate to="/home" />;
  }

  // Render the route if `userId` exists.
  return <Route element={element} {...rest} />;
}

export default GuardedRoute;
