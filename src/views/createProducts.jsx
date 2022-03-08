import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallproducts, postproducts } from '../redux/actions';
import logo from "../../src/img/logo.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name must be completed'
    } else if (!input.price) {
        errors.price = 'completed here!'
    } else if (!input.discount) {
        errors.discount = 'completed here!'
    } else if (input.discount < 0) {
        errors.discount = 'no menor a 0'
    } else if (!input.stock) {
        errors.stock = 'complete here!'
    } else if (!input.description) {
        errors.description = 'complete here!'
    } else if (!input.categories) {
        errors.categories = 'complete here!'
    } else if (!input.image) {
        errors.image = 'complete here!'
    }

    return errors
}


const CreateProduct = () => {
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {shopId} = useParams()
    const [input, setInput] = useState({

        shopId: '6220243e7afb1f1e0718fe06',
        name: "",
        description: "",
        price: 0,
        discount: 0,
        stock: 0,
        categoriesId: [],
        image: "",
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleUploadImg = (element) => {
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            setInput({ ...input, image: reader.result })
        }
        reader.readAsDataURL(file); //transforma la imagen a b64 (string), y asi lo puede leer
    }
    function handleSubmit(e) {
        e.preventDefault()
        alert("Menu Creado!")

        const produc = {
            shopId: input.shopId,
            name: input.name,
            description: input.description,
            price: Number(input.price),
            discount: Number(input.discount),
            stock: Number(input.stock),
            categoriesId: input.categoriesId,
            image: input.image,
        }
        console.log(produc)
        dispatch(postproducts(produc))
        dispatch(getallproducts())
        navigate('/home') // me redirige al home cuando termino de crear el personaje 
    }
    return (
        <div>
            <div className="font-poppins w-full h-24 bg-ochre flex justify-between">
                <div className="w-1/3 flex justify-between items-center p-1">
                    <Link to="/home" className="ml-4">
                        <img src={logo} className="w-20" alt="logo" />
                    </Link>

                </div>

            </div>
            <form   >
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label for="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                                <input type="text" name="name" id="first-name" autocomplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={input.name}
                                                    required
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                {
                                                    errors.name && (
                                                        <p>{errors.name}</p>
                                                    )
                                                }
                                            </div>

                                            <div>
                                                <label for="price" className="block text-sm font-medium text-gray-700">Price</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm"> $ </span>
                                                    </div>
                                                    <input type="number" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00"
                                                        value={input.price}
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                    <div>

                                                        {
                                                            errors.price && (
                                                                <p>{errors.price}</p>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <div>
                                                <label for="discount" className="block text-sm font-medium text-gray-700">descuento</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm"> % </span>
                                                    </div>
                                                    <input type="number" name="discount" id="discount" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00"
                                                        value={input.discount}
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                    <div>

                                                        {
                                                            errors.discount && (
                                                                <p>{errors.discount}</p>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                            <div>
                                                <label for="stock" className="block text-sm font-medium text-gray-700">stock</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm"> % </span>
                                                    </div>
                                                    <input type="number" name="stock" id="stock" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00"
                                                        value={input.stock}
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                    <div>

                                                        {
                                                            errors.discount && (
                                                                <p>{errors.discount}</p>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            </div>



                                            <div className="col-span-6 sm:col-span-3">
                                                <label for="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                <select id="country" name="country" autocomplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                            </div>


                                            <div>
                                                <label className="block text-sm font-medium text-gray-700"> Cover photo </label>
                                                <div className="mt-5 flex justify-center px-6 pt-6 pb-10 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        {!input.image ? (
                                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        ) : (
                                                            'Archivo subido'
                                                        )}

                                                        <div className="flex text-sm text-gray-600">
                                                            <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                <span>Upload a file</span>
                                                                <input type="file"
                                                                    onChange={handleUploadImg} />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div>
                                                <label for="description" className="block text-sm font-medium text-gray-700"> About </label>
                                                <div className="mt-1">
                                                    <textarea id="description" name="description" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"
                                                        type="text"
                                                        value={input.description}
                                                        required
                                                        onChange={handleChange}></textarea>
                                                </div>

                                            </div>




                                        </div>
                                    </div>

                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <input onClick={handleSubmit} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" value='send' />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>





            </form>
        </div>
    )

}


export default CreateProduct;