import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { IUser } from "../../redux/reducers/types";
import { RootState } from "../../redux/store";

function ProtectedRoute({
  component: Component,
  exact,
  path,
}: {
  component: React.FC;
  exact: boolean;
  path: string;
}) {
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (user ? <Component /> : <Redirect to="/login" />)}
    />
  );
}

export default ProtectedRoute;
