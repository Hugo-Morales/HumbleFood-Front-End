function Login() {
  // const domain = process.env.REACT_APP_DOMAIN;
  // const clientId = process.env.REACT_APP_CLIENT_ID;
  // const accessToken = null;
  // const profile = null;

  // const lock = new Auth0Lock(clientId, domain, {
  //   hooks: {
  //     loggingIn: function (context, cb) {
  //       console.log('Hello from the login hook!');
  //       cb();
  //     },
  //     signingUp: function (context, cb) {
  //       console.log('Hello from the sign-up hook!');
  //       cb();
  //     }
  //   },
  //   language: 'es',
  //   languageDictionary: {
  //     emailInputPlaceholder: 'Ingrese su email',
  //     title: 'Bienvenido'
  //   },
  //   auth: {
  //     redirectUrl: 'http://localhost:3000',
  //     redirect: false,
  //     autoParseHash: true,
  //     responseType: "token",
  //     sso: true,
  //   },
  //   popupOptions: { width: 600, height: 700, left: 200, top: 300 },
  //   theme: {
  //     logo: 'https://example.com/logo.png'
  //   }
  // });

  // lock.on('authenticated', function (authResult) {
  //   lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
  //     if (error) return;

  //     authResult.accessToken = accessToken;
  //     profileResult = profile;
  //   });
  // });


  // useEffect(() => {
  //   lock.show()
  // })
  return (<></>);
}

export default Login;
