import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import ContainerT from "../views/TiendaPanel/ContainerT";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  // console.log(user);

  if (isLoading) return <Loading />;

  return <>{isAuthenticated ? <ContainerT user={user}/> : <Navigate to="/home" />}</>;
}