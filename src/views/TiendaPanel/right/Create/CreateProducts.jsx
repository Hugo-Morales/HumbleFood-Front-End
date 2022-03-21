import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validate from "./Validate";
import Functions from "./Functions";
import Input from "./Input";
import Loading from "../../../../components/loading/Loading";
import { getallCategories, loading_panel } from "../../../../redux/actions";
import { MdDelete } from "react-icons/md";

export default function CreateProducts({ shopId }) {
  const {
    handleChange,
    handleSubmit,
    input,
    err,
    listcategories,
    handleImagen,
    eliminar,
    handleSelect,
    progress,
    modal,
    deleteImagen,
  } = Functions(Validate, shopId);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allcategories);
  const cargando = useSelector((state) => state.loadingPanel);
  // console.log(categories);

  useEffect(() => {
    dispatch(loading_panel());
    dispatch(getallCategories());
  }, [dispatch]);
  //console.log(categories)
  return (
    <>
      {cargando ? (
        <div className="flex justify-center items-center bg-white">
          <Loading />
        </div>
      ) : (
        <>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="border-b border-gray-200 bg-red-200 text-center rounded-t-lg">
              <h1 className="uppercase font-bold">Formulario</h1>
            </div>
          </div>
          <div className="mt-10 sm:mt-0">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="shadow overflow-hidden">
                <div className="bg-white">
                  <div className="px-2 py-5 bg-white sm:p-6">
                    <div className="lg:grid lg:grid-cols-6 gap-6">
                      {/* Input Nombre */}
                      <Input
                        div="lg:col-span-6 sm:col-span-3 font-bold"
                        forid="first-name"
                        lclass="block text-sm uppercase"
                        tl="Nombre del Producto"
                        it="text"
                        iname="name"
                        iId="first-name"
                        iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md pl-3 py-1"
                        valor={input.name}
                        c={handleChange}
                        ediv="text-rose-800 border-black-300 "
                        err={err.name}
                        placeholder="Ingrese nombre del producto"
                      />

                      {/* Input Precio */}
                      <Input
                        div="col-span-1 font-bold "
                        forid="price"
                        lclass="block text-sm uppercase"
                        tl="Precio $"
                        it="number"
                        iname="price"
                        iId="price"
                        iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 py-1 sm:text-sm border-gray-300 border-2 rounded-md"
                        valor={input.price}
                        c={handleChange}
                        ediv="text-rose-800"
                        err={err.price}
                      />

                      {/* Input Descuento */}
                      <Input
                        div="col-span-1 font-bold"
                        forid="discount"
                        lclassName="block text-sm uppercase"
                        tl="Descuento"
                        it="number"
                        iname="discount"
                        iId="discount"
                        iclassName="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 py-1 sm:text-sm border-gray-300 border-2 rounded-md"
                        valor={input.discount}
                        c={handleChange}
                        ediv="text-rose-800"
                        err={err.discount}
                      />

                      {/* Input Stock */}
                      <Input
                        div="col-span-1 font-bold"
                        forid="stock"
                        lclassName="block text-sm uppercase"
                        tl="Stock"
                        it="number"
                        iname="stock"
                        iId="stock"
                        iclassName="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 py-1 sm:text-sm border-gray-300 border-2 rounded-md"
                        valor={input.stock}
                        c={handleChange}
                        ediv="text-rose-800"
                        err={err.stock}
                      />

                      {/* TextArea Description */}
                      <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="description" className="font-bold">
                          {" "}
                          Descripción{" "}
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 pl-3 py-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none"
                            placeholder="Descripción del productos (Ej. Los ingredientes)"
                            type="text"
                            value={input.description}
                            onChange={handleChange}
                          ></textarea>
                          <div className="text-rose-800 font-bold">
                            {err.description && <p>{err.description}</p>}
                          </div>
                        </div>
                      </div>

                      {/* TextArea Categorías */}
                      <div className="col-span-6 sm:col-span-6">
                        <div className="flex flex-col">
                          <label htmlFor="categories" className="font-bold">
                            Categorías
                          </label>
                          {/* <input
												className="h-30"
												type="text"
												name="categories"
												placeholder="Ingrese una categoría del producto."
												
												onChange={handleChange}
												autoComplete="off" 
											/> */}
                          {/* <datalist id="categories">
												{categories?.map((pais, index) => (
													<option key={index} value={pais.name} />
												))}
											</datalist> */}
                          {/* <input
												className="inline-flex justify-center my-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
												type="button"
												value="Agregar nueva Categoria"
												style={{ cursor: "pointer" }}
												onClick={add}
											/>
											<label htmlFor="categories" className="font-bold">
												Categorías disponibles
											</label> */}
                          <select
                            className=" py-1 border-2 border-zinc-500 rounded-xl"
                            name="Selectcategories"
                            onChange={handleSelect}
                          >
                            <option value="default" selected disabled>
                              Seleccione una categoría para el producto.
                            </option>
                            {categories?.map((pais, index) => {
                              return (
                                <option key={index} value={pais.name}>
                                  {pais.name}
                                </option>
                              );
                            })}
                          </select>
                          <div className="text-rose-800 font-bold">
                            {err.listcategories && <p>{err.listcategories}</p>}
                          </div>
                        </div>
                        {listcategories?.add.map((c, index) => {
                          return (
                            <div key={index} className="flex justify-between">
                              <label className="">{c}</label>
                              <button
                                className=""
                                name="eliminar"
                                onClick={(e) => eliminar(e, c)}
                              >
                                <MdDelete className="text-red-600" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Imagen */}
                      {input.image === "" ? (
                        <>
                          <div className="col-span-6 sm:col-span-6">
                            <div className="flex flex-col">
                              <label className="font-bold">Imagen</label>
                              <label className="text-red-500 font-bold">
                                (Nota: Sólo podés subir una imagen.)
                              </label>
                              <input
                                type="file"
                                className="w-full"
                                onChange={handleImagen}
                              />
                              {progress !== 0 ? (
                                <h2>Subiendo archivo {progress}%</h2>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col">
                          <label className="font-bold mb-2">Imagen</label>
                          <div className="flex justify-around">
                            <img
                              src={input.image}
                              alt="product"
                              className="h-10 w-10 rounded-lg cursor-pointer"
                              onClick={() => modal()}
                            />
                            <button onClick={(e) => deleteImagen(e)}>
                              <MdDelete className="ml-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Aca termina */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
                <button
                  type="submit"
                  name="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Crear Producto{" "}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
