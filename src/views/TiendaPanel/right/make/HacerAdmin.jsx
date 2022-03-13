import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/loading/Loading";
import {
  getAllUser,
  loading_panel,
  banU,
  banS,
  admin,
} from "../../../../redux/actions";

export default function HacerAdmin() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUser);
  const cargando = useSelector((state) => state.loadingPanel);

  useEffect(() => {
    dispatch(loading_panel());
    dispatch(getAllUser(0));
  }, [dispatch]);

  const banUser = (type, id) => {
    dispatch(banU(type, id));
    dispatch(loading_panel());
    setTimeout(() => {
      dispatch(getAllUser(0));
    }, 700);
  };

  const banShop = (type, id) => {
    dispatch(banS(type, id));
    dispatch(loading_panel());
    setTimeout(() => {
      dispatch(getAllUser(0));
    }, 700);
  };

  const adminUser = (type, id) => {
    dispatch(admin(type, id));
    dispatch(loading_panel());
    setTimeout(() => {
      dispatch(getAllUser(0));
    }, 700);
  };

  const borrar = (id) => {
    dispatch(loading_panel());
    setTimeout(() => {
      dispatch(getAllUser(0));
    }, 700);
  };

  return (
    <>
      {cargando ? (
        <div className="flex justify-center items-center bg-white">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Banear
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Borrar
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {users?.map((u, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          {u?.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-500">
                          {u?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        {u?.rol === 3 ? (
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                            Baneado
                          </span>
                        ) : u?.rol === 2 ? (
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-300 rounded-full">
                            Admin
                          </span>
                        ) : u.rol === 1 ? (
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                            Vendedor
                          </span>
                        ) : (
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                            Comprador
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        {u?.rol === 3 ? (
                          u?.shopsId.length === 1 ? (
                            <button
                              className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                              onClick={() => banShop("unban", u?.userId)}
                            >
                              Quitar Ban de la Tienda
                            </button>
                          ) : (
                            <button
                              className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                              onClick={() => banUser("unban", u?.userId)}
                            >
                              Quitar Ban
                            </button>
                          )
                        ) : u?.rol === 2 ? (
                          <button
                            className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                            onClick={() => adminUser("takeAdmin", u?.userId)}
                          >
                            Quitar Admin
                          </button>
                        ) : u?.rol === 1 ? (
                          <>
                            <button
                              className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                              onClick={() => banShop("ban", u?.userId)}
                            >
                              Banear Tienda
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                              onClick={() => banUser("ban", u?.userId)}
                            >
                              Banear User
                            </button>
                            <button
                              className="inline-flex px-2 mx-2 mt-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                              onClick={() => adminUser("makeAdmin", u?.userId)}
                            >
                              Hacer Admin
                            </button>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <button
                          className="hover:bg-red-200 rounded-lg p-1"
                          onClick={() => borrar(u?.email)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
