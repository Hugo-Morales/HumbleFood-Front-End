import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/actions';
import Paginado from '../../../components/paginado/Paginado'

export default function Table({ p, d, next, prev, pagesTotal, paging, currentPage }) {
    // console.log(p?.length)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [dele, setDele] = useState([]);

    const confirmProduct = (id) => {
        setShowModal(true)
        setDele(id)
    }

    const delProduct = (id) => {
        // console.log(id)
        dispatch(deleteProduct(id))
        setShowModal(false);
    }

    if (showModal) {
        return (
            <div className='className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"'>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className='className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"'>
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Confirmación
                            </h3>
                            <button
                                className=" p-2 bg-red-700 border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none rounded-lg text-center"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="text-black h-6 w-6 block outline-none focus:outline-none fonttt"> X </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative px-6 flex-auto">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                ¿Deseas borrar el producto {dele?.name}?
                            </p>
                        </div>
                        {/* footer */}
                        <div className="flex items-center justify-end px-2 py-2 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-red-600 font-bold uppercase px-6 py-3 text-sm outline-none rounded focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                No
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => delProduct(dele?.id)}
                            >
                                SÍ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
    return (
        <>
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
                                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                                        >
                                            Estado
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                                        >
                                            Precio Total
                                        </th>
                                        {
                                            d ? (
                                                <th scope="col" className="relative px-6 py-3">
                                                    {
                                                        p?.length ? (<p>Borrar</p>) : (<p>No hay Productos</p>)
                                                    }
                                                </th>
                                            ) : (
                                                <th scope="col" className="relative px-6 py-3">
                                                    {
                                                        p?.length ? (<p>Editar</p>) : (<p>No hay Productos</p>)
                                                    }
                                                </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {p?.length ? (p.map((p, index) => (
                                        <tr key={index} className='dark:hover:bg-gray-400'>
                                            <td className="px-6 py-4 whitespace-nowrap ">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={p?.image} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                                        <div className="text-sm text-gray-500">{p?.categories.join(' ')}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 whitespace-nowrap text-center">
                                                {
                                                    p?.stock === 0 ? (
                                                        <div className="text-sm text-gray-900">Sin Stock</div>
                                                    ) : (<div className="text-sm text-gray-500">{p?.stock}</div>)
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Creada
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                {
                                                    p?.stock === 0 ? (
                                                        <>
                                                            <div className="text-sm text-gray-900">Sin Stock</div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="text-gray-900">
                                                                <p>${p?.price * p?.stock}</p>
                                                            </div>
                                                            <div className="text-gray-500"><p>${p?.price} c/stock</p></div>
                                                        </>
                                                    )
                                                }
                                            </td>
                                            {
                                                d ? (
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="hover:text-indigo-900 bg-red-800 p-2 text-white rounded-lg" onClick={() => confirmProduct(p)}>
                                                            Borrar
                                                        </button>
                                                    </td>
                                                ) : (
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900">
                                                            Editar
                                                        </button>
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    ))) : (
                                        <tr className='w-full'>
                                            <td className='text-center py-2'>No hay ninguno producto actualmente</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Paginado next={next} prev={prev} pagesTotal={pagesTotal} paging={paging} currentPage={currentPage} />
        </>
    )
}
