import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";
import Auth0Lock from 'auth0-lock';
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const lock = new Auth0Lock(clientId, domain);

  // lock.resumeAuth(hash, function (error, authResult) {
  //   if (error) {
  //     alert('Could not parse hash');
  //   }
  //   console.log(authResult.accessToken);
  // });

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{' '}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <Nav />;
  }

  // return (
  //   // <div>
  //   //   <Nav />
  //   //   <Cards />
  //   // </div>

  // );
};

export default Home;
