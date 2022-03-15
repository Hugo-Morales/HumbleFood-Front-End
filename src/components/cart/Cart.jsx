import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { getdataUser } from "../../redux/actions";
import CartItem from "./CartItem";
import PaypalCheckoutButton from "../Paypal/PaypalCheckoutButton";
import { useParams } from "react-router-dom";
// import { Link, useParams } from "react-router-dom";

export function calculateTotal(items) {
  return items
    .reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
}

export default function Cart({
  open,
  setOpen,
  cartItems,
  setCartItems,
  shopEmail,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) {
  const [checkout, setCheckout] = useState(false);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const { shopId } = useParams();

  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.dataUser);

  const userId = user?.sub.split("|")[1];

  useEffect(() => {
    dispatch(getdataUser(userId));
  }, [dispatch, userId]);

  // console.log("dataUser", dataUser);

  // useEffect(() => {
  //   if (window.location.origin) {
  //     return () => {
  //       setCartItems([]);
  //       alert("Me vacié");
  //     };
  //   }
  // }, [setCartItems]);

  const productsId = cartItems.map((item) => ({
    id: item.id,
    cantidad: item.amount,
  }));

  let order = {
    products: productsId,
    shopId: shopId,
    userId: dataUser?.id,
  };
  // console.log("order", order);
  // console.table(order.products);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => {
          setOpen(false);
          setCheckout(false);
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900 flex items-center">
                        Carrito de Comprass
                        <MdShoppingCart className="w-6 h-6 ml-2" />
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="button-cart -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            setOpen(false);
                            setCheckout(false);
                          }}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cartItems.length === 0 ? (
                            <p>No hay items en el carrito</p>
                          ) : null}
                          {cartItems.map((product) => (
                            <CartItem
                              key={product.id}
                              product={product}
                              handleAddToCart={handleAddToCart}
                              handleRemoveFromCart={handleRemoveFromCart}
                              handleDeleteFromCart={handleDeleteFromCart}
                              checkout={checkout}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div
                      className={
                        cartItems.length
                          ? "flex justify-end text-base font-medium text-gray-900"
                          : "opacity-0"
                      }
                    >
                      <h2 className="text-2xl">
                        {" "}
                        Total del Carrito:{" "}
                        <span className="font-extrabold">
                          ${calculateTotal(cartItems)}
                        </span>
                      </h2>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Envío e impuestos calculados al finalizar la compra.
                    </p>
                    <div className="mt-6 w-full">
                      <button
                        type="button"
                        onClick={() => setCheckout(false)}
                        className={
                          checkout
                            ? "w-full mb-4 p-2 font-medium text-indigo-600 border-solid border-2 border-indigo-600 rounded hover:text-isabelline hover:bg-indigo-500"
                            : "hidden"
                        }
                      >
                        Modificar Carrito
                      </button>
                      {checkout ? (
                        <div className="paypal-button-container">
                          <PaypalCheckoutButton
                            order={order}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            shopEmail={shopEmail}
                            setOpen={setOpen}
                          />
                        </div>
                      ) : isAuthenticated ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCheckout(true);
                          }}
                          className={
                            cartItems.length
                              ? "w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              : "hidden"
                          }
                        >
                          Checkout
                          <AiOutlineDollarCircle className="ml-2 w-6 h-6" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            loginWithRedirect();
                          }}
                          className={
                            cartItems.length
                              ? "w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              : "hidden"
                          }
                        >
                          Por favor, Inicie Sesion
                        </button>
                      )}
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            setOpen(false);
                            setCheckout(false);
                          }}
                        >
                          Continuar Comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      {/* <Paypal
        className={cartItems.length ? "w-full" : "hidden"}
        cartItems={cartItems}
      /> */}
    </Transition.Root>
  );
}
