import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import CreateShop from "../views/seller/createNewShop/createShop";

export default function PrivateShop() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) return <Loading />;

  return <>{isAuthenticated ? <CreateShop user={user}/> : <Navigate to="/home" />}</>;
}