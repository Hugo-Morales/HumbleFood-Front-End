import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userRojo from "../../img/userRojo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavShops2 = () => {
  const MySwal = withReactContent(Swal);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const user_id = user?.sub.split("|")[1];

  const handleclick = () => {
    if (isAuthenticated) {
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "¡Te has suscrito al boletin informativo revisa tu email!",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      MySwal.fire({
        icon: "info",
        title:
          "¡Primero inicia sesion para poder suscribirte al boletin informativo!",
      });
    }
  };
  return (
    <Disclosure as="nav" className="bg-ochre h-24">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="mt-8 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="mt-7 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/home">
                    <img
                      className="hidden sm:block  sm:h-14 sm:w-14 sm:w-14 lg:w-14"
                      src={logo}
                      alt="logo"
                    />
                  </Link>

                  <Link to="/home">
                    <h1 className=" block sm:ml-3  text-isabelline text-3xl font-extrabold">
                      Humblefood
                    </h1>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className=" mt-3 flex space-x-4">
                    <a
                      href="/favorites"
                      className={classNames(
                        "bg-gray-900 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      Tus tiendas favoritas
                    </a>
                    <a
                      className={classNames(
                        "bg-gray-900 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      ¿Quienes somos?
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-5 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={() => handleclick()}
                  type="button"
                  className="hidden md:inline-block  mt-4 mr-3 bg-gray-900 hover:bg-gray-600 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {isAuthenticated ? (
                  <div className="flex mt-3">
                    <h3 className="hidden md:inline-block mr-3 mt-1">
                      Bienvenido {user?.name}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="hidden md:inline-block icon icon-tabler icon-tabler-arrow-bar-right"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="#000000"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="20" y1="12" x2="10" y2="12" />
                      <line x1="20" y1="12" x2="16" y2="16" />
                      <line x1="20" y1="12" x2="16" y2="8" />
                      <line x1="4" y1="4" x2="4" y2="20" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex mt-3">
                    <h3 className="hidden md:inline-block mr-3 mt-1">
                      ¡Registrate ahora o inicia sesion!
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="hidden md:inline-block icon icon-tabler icon-tabler-arrow-bar-right"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="#000000"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="20" y1="12" x2="10" y2="12" />
                      <line x1="20" y1="12" x2="16" y2="16" />
                      <line x1="20" y1="12" x2="16" y2="8" />
                      <line x1="4" y1="4" x2="4" y2="20" />
                    </svg>
                  </div>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="mt-3 ml-3 relative">
                  <div>
                    {isAuthenticated ? (
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={user?.picture}
                          alt="img not found"
                        />
                      </Menu.Button>
                    ) : (
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={userRojo}
                          alt="img not found"
                        />
                      </Menu.Button>
                    )}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-50 right-0 mt-8 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isAuthenticated ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={`/settings/${user_id}`}
                                className={classNames(
                                  active ? "hover:bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Panel de usuario
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  logout({ returnTo: window.location.origin })
                                }
                                className={classNames(
                                  active ? "hover:bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-white"
                                )}
                              >
                                Cerrar sesion
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => loginWithRedirect()}
                              className={classNames(
                                active ? "hover:bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              Iniciar sesion / registrarse
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden absolute z-50">
            <div className="mt-8 px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button
                className={classNames(
                  "bg-gray-900 hover:bg-gray-600 text-white block px-3 py-2 rounded-md text-base font-medium mb-1"
                )}
              >
                ¿Quienes somos?
              </Disclosure.Button>

              <Link to="/favorites">
                <Disclosure.Button
                  className={classNames(
                    "bg-gray-900 hover:bg-gray-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  ¡Tus tiendas favoritas!
                </Disclosure.Button>
              </Link>

              <Disclosure.Button
                className={classNames(
                  "bg-gray-900 hover:bg-gray-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                )}
              >
                ¡Suscribirse al boletin informativo!
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavShops2;
