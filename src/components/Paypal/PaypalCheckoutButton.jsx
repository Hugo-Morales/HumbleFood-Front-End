import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { calculateTotal } from "../cart/Cart";
import { postOrder } from "../../redux/actions";

function PaypalCheckoutButton({
  order,
  itemsPerShop,
  cartItems,
  setCartItems,
  shopId,
  shopEmail,
  setOpen,
}) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

  const handleAprove = (orderId) => {
    //Call backend function to fullfill order
    // if response is success
    const cleanCart = cartItems.filter((item) => item.shopId !== shopId);
    setCartItems(cleanCart);
    dispatch(postOrder(order));
    setOpen(false);
    setPaidFor(true);
    // console.log("orderId", orderId);
    // Refresh user's account or subscription status

    // if the response is error
    // setError ("Your payment was processed successfully. However, we are unable to fullfill your purchase. Please contact us at suport@designcode.io for assistance.")
    if (error) {
      MySwal.fire({
        title: setError(
          "Su pago se procesó correctamente. Sin embargo, no podemos completar su compra. Póngase en contacto con nosotros en suport@designcode.io para obtener ayuda"
        ),
        icon: "error",
        confirmButtonText: "OK",
        backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
      });
    }
  };

  if (paidFor) {
    //   Display success message, modal or redirect usere to succes page
    MySwal.fire({
      title: `Gracias por su compra`,
      icon: "success",
      confirmButtonText: "OK",
      backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
      `,
    });
  }

  if (error) {
    //Display error message, modal or redirect user to error page
    MySwal.fire({
      title: error,
      icon: "error",
      confirmButtonText: "OK",
      backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
    });
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
                value: calculateTotal(itemsPerShop),
              },
              payee: {
                email_address: shopEmail,
              },
              shipping: {
                options: [
                  {
                    id: "SHIP_123",
                    label: "Envío a domicilio",
                    type: "SHIPPING",
                    selected: true,
                    amount: {
                      value: "3.00",
                      currency_code: "USD",
                    },
                  },
                  {
                    id: "SHIP_456",
                    label: "Retiro en Tienda",
                    type: "PICKUP",
                    selected: false,
                    amount: {
                      value: "0.00",
                      currency_code: "USD",
                    },
                  },
                ],
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        await actions.order.capture().then((details) => {
          // console.log(details);
        });

        handleAprove(data.orderID);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
        window.location.href = "/error404";
      }}
    />
  );
}

export default PaypalCheckoutButton;
