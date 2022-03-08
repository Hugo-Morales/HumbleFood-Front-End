import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;

function CartItem({ product, handleAddToCart, handleRemoveFromCart, handleDeleteFromCart }) {
  return (
    <div>
      <Wrapper key={product.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image}
            alt={product.image}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <div>
              <p className="ml-4">Precio: ${product.price}</p>
              <p className="ml-4">
                Total: ${(product.price * product.amount).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="buttons w-32 flex items-center space-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                -
              </button>
              <p className="py-2 px-4 font-bold text-lg border-inherit border-solid border-2 border-slate-300 rounded">{product.amount}</p>
             {product.stock >= product.amount ? <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded"
                onClick={() => handleAddToCart(product)}
              >
                +
              </button> : <p className="text-red-600">Max.</p>}
            </div>
            <div className="flex">
              <button
                onClick={() => handleDeleteFromCart(product.id)}
                type="button"
                className="px-2 py-1 font-medium text-lg text-red-600 border-solid border-2 border-red-600 rounded-md ease-in-out duration-300 hover:text-isabelline hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default CartItem;
