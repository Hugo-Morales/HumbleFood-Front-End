import { ErrorOutlineSharp } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postproducts,
  getCategories,
  NewCategory,
} from "../../../../redux/actions";
import Input from "./Input";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Este campo es obligatorio";
  } else if (!input.price) {
    errors.price = "Completa aqui";
  } else if (input.price < 0) {
    errors.price = 'Tiene que ser mayor a 0'
  } else if (!input.discount) {
    errors.discount = "Completa aqui";
  } else if (input.discount < 0) {
    errors.discount = "no menor a 0";
  } else if (!input.stock) {
    errors.stock = "complete here!";
  } else if (input.stock < 0) {
    errors.stock = 'No menor a 0'
  } else if (!input.description) {
    errors.description = "complete here!";
  } else if (!input.categories) {
    errors.categories = "complete here!";
  } else if (!input.image) {
    errors.image = "complete here!";
  }
  return errors;
}

const CreateProduct = ({ shopId }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const activado = !errors.name && !errors.price && !errors.discount && !errors.stock && !errors.description;
  // const {shopId} = useParams()
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    stock: 0,
    categories: [],
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleUploadImg = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setInput({ ...input, image: reader.result });
    };
    reader.readAsDataURL(file); //transforma la imagen a b64 (string), y asi lo puede leer
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Menu Creado!");

    const produc = {
      shopId: shopId[0],
      name: input.name,
      description: input.description,
      price: Number(input.price),
      discount: Number(input.discount),
      stock: Number(input.stock),
      categoriesId: input.categories,
      image: input.image,
    };
    dispatch(postproducts(produc));
  };

  const handleSelect = (e) => {
    // console.log(e.target.value)
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");
    setInput({
      ...input,
      categories: [...input.categories, id],
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCategory = (e) => {
    e.preventDefault();
    const category = {
      categories: input.categories,
    };
    if (input.categories) {
      return dispatch(NewCategory(category));
    } else if (!input.categories) {
      return alert("no hay nada");
    }
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      categories: input.categories.filter((t) => t === el),
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-b border-gray-200">
            <h1 className="uppercase font-bold">Formulario</h1>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  {/* Input Nombre */}
                  <Input
                    div="col-span-6 sm:col-span-3 font-bold"
                    forid="first-name"
                    lclass="block text-sm uppercase"
                    tl="Nombre del Producto"
                    it="text"
                    iname="name"
                    iId="first-name"
                    iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                    valor={input.name}
                    c={handleChange}
                    ediv="text-rose-800 border-black-300 "
                    err={errors.name}
                  />

                  {/* Input Precio */}
                  <Input
                    div="col-span-1 font-bold"
                    forid="price"
                    lclass="block text-sm uppercase"
                    tl="Precio $"
                    it="number"
                    iname="price"
                    iId="price"
                    iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 border-2 rounded-md"
                    valor={input.price}
                    c={handleChange}
                    ediv="text-rose-800"
                    placeholder='0'
                    err={errors.price}
                  />

                  {/* Input Descuento */}
                  <Input
                    div="col-span-1 font-bold"
                    forid="discount"
                    lclass="block text-sm uppercase"
                    tl="Descuento %"
                    it="number"
                    iname="discount"
                    iId="discount"
                    iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 border-2 rounded-md"
                    valor={input.discount}
                    c={handleChange}
                    ediv="text-rose-800"
                    err={errors.discount}
                  />

                  {/* Input Stock */}
                  <Input
                    div="col-span-1 font-bold"
                    forid="stock"
                    lclass="block text-sm uppercase"
                    tl="Stock"
                    it="number"
                    iname="stock"
                    iId="stock"
                    iclass="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 border-2 rounded-md"
                    valor={input.stock}
                    c={handleChange}
                    ediv="text-rose-800"
                    err={errors.stock}
                  />

                  {/* TextArea Description */}
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="description" className="font-bold">
                      {" "}
                      Descripción{" "}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none"
                        placeholder="Descripción del productos (Ej. Los ingredientes)"
                        type="text"
                        value={input.description}
                        required
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  {/* TextArea Categorías */}
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="categories" className="font-bold">
                      Categorías
                    </label>
                    <select
                      id="categories"
                      name="categories"
                      onChange={handleSelect}
                      autoComplete="categories"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Categorías</option>
                      {categories?.map((c, index) => (
                        <option id={c.id} key={index}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {input.categories?.map((c, index) => (
                      <div key={index}>
                        <p>{categories.find((d) => d.id === c).name}</p>
                      </div>
                    ))}
                    <button onClick={(el) => handleDelete(el)}>Borrar</button>
                  </div>

                  {/* Imagen */}
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {" "}
                      Cover photo{" "}
                    </label>
                    <div className="mt-5 flex-wrap flex justify-center px-6 pt-6 pb-10 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {!input.image ? (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          "Archivo subido"
                        )}
                        <span>Subir archivo </span>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <input type="file" onChange={handleUploadImg} />
                          </label>
                        </div>
                        <p className="pl-1">o arrastrar y soltar</p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3e bg-gray-50 text-right sm:px-6">
              <input
                type="submit"
                className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                value="Crear Categoria"
                onClick={handleCategory}
                ediv="text-rose-800"
                err={errors.categories}
              />
              <input
                type="submit"
                disabled={!activado}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                value="Crear Producto"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
