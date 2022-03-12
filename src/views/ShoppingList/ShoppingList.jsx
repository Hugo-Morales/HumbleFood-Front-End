import React, { useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
// import CartItem from "../../components/cart/CartItem";
import Paypal from "../../components/Paypal/Paypal";

function Cart({ cartItems }) {
  const [checkout, setCheckout] = useState(false);

  return (
    <div>
      {/* {cartItems.map((product) => (
        <CartItem key={product.id} product={product} />
      ))} */}
      {/* <div className="mt-6 w-full">
        {checkout ? (
          <Paypal
            className={cartItems.length ? "w-full" : "hidden"}
            cartItems={cartItems}
          />
        ) : (
          <button
            onClick={() => {
              setCheckout(true);
            }}
            className={
              cartItems.length
                ? "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                : "hidden"
            }
          >
            Checkout
            <AiOutlineDollarCircle className="ml-2 w-6 h-6" />
          </button>
        )}
      </div> */}
      holaa
    </div>
  );
}

export default Cart;
