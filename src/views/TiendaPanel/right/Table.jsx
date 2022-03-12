import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../redux/actions";
import Paginado from "../../../components/paginado/Paginado";
import Modal from "../Modal";
import InfoDataUser from "./InfoDataUser";

export default function Table({
  p,
  d,
  next,
  prev,
  pagesTotal,
  paging,
  currentPage,
}) {
  const dataUser = useSelector((state) => state.dataUser);
  // console.log(p?.length)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [dele, setDele] = useState([]);

  const confirmProduct = (id) => {
    setShowModal(true);
    setDele(id);
  };

  const delProduct = (id) => {
    // console.log(id)
    dispatch(deleteProduct(id));
    setShowModal(false);
  };

  if (showModal)
    return <Modal name={dele?.name} id={dele?.id} del={delProduct} />;

  return (
    <>
      <InfoDataUser dataUser={dataUser} />
      <div className="flex flex-col">
        <div className="overflow-x-auto-my-2 sm:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Nombre del Producto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Precio Total
                    </th>
                    {d ? (
                      <th scope="col" className="relative px-6 py-3">
                        {p?.length ? <p>Borrar</p> : <p>No hay Productos</p>}
                      </th>
                    ) : (
                      <th scope="col" className="relative px-6 py-3">
                        {p?.length ? <p>Editar</p> : <p>No hay Productos</p>}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {p?.length ? (
                    p.map((p, index) => (
                      <tr key={index} className="dark:hover:bg-gray-400">
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={p?.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {p.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {p?.categories.join(" ")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          {p?.stock === 0 ? (
                            <div className="text-sm text-gray-900">
                              Sin Stock
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              {p?.stock}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Creada
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          {p?.stock === 0 ? (
                            <>
                              <div className="text-sm text-gray-900">
                                Sin Stock
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-gray-900">
                                <p>${p?.price * p?.stock}</p>
                              </div>
                              <div className="text-gray-500">
                                <p>${p?.price} c/stock</p>
                              </div>
                            </>
                          )}
                        </td>
                        {d ? (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="hover:text-indigo-900 bg-red-800 p-2 text-white rounded-lg"
                              onClick={() => confirmProduct(p)}
                            >
                              Borrar
                            </button>
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Editar
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr className="w-full">
                      <td className="text-center py-2">
                        No hay ninguno producto actualmente
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Paginado
        next={next}
        prev={prev}
        pagesTotal={pagesTotal}
        paging={paging}
        currentPage={currentPage}
      />
    </>
  );
}
