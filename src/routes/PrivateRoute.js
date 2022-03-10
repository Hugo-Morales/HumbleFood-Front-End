import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import ContainerT from "../views/TiendaPanel/ContainerT";

function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return <>{isAuthenticated ? <ContainerT /> : <Navigate to="/home" />}</>;
}

export default PrivateRoute;
