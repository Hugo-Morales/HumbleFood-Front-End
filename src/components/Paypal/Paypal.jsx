import React, { useEffect, useRef } from "react";
import { calculateTotal } from "../cart/Cart";

function Paypal({ cartItems }) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: calculateTotal(cartItems),
                },
              },
            ],
          });
        },
        onAprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(paypal.current);
      // console.log(paypal.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default Paypal;
