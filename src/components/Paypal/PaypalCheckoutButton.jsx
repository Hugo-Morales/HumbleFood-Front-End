import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { calculateTotal } from "../cart/Cart";

function PaypalCheckoutButton({ cartItems, shopEmail }) {

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);


  const handleAprove = (orderId) => {
    //Call backend function to fullfill order
    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if the response is error
    // setError ("Your payment was processed successfully. However, we are unable to fullfill your purchase. Please contact us at suport@designcode.io for assistance.")
  };

  if (paidFor) {
    //   Display success message, modal or redirect usere to succes page
    alert("Gracias por su compra");
  }

  if (error) {
    //Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        height: 48,
        tagline: false,
      }}
      onClick={(data, actions) => {
        //   Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "Cool looking table",
              amount: {
                value: calculateTotal(cartItems),
              },
              payee: {
                email_address: shopEmail,
              },
            },
          ],
        });
      }}
      onAprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleAprove(data.orderID);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
    />
  );
}

export default PaypalCheckoutButton;
