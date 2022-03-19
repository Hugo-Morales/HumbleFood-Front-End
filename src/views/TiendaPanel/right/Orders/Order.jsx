import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { getdataUser } from "../../../../redux/actions";
import { updateOrderState } from "../../../../redux/actions/actionsOrders";
import DetailOrder from "./DetailOrder";


function Order({ id, total, state, index, shopId, userInfo, productsInfo }) {
  const [stateOrder, setStateOrder] = useState("");
  const dispatch = useDispatch();

  const newState = [
    "pendienteDeProcesamiento",
    "creado",
    "procesando",
    "enviando",
    "completado",
    "cancelado",
  ];

  useEffect(() => {
    dispatch(updateOrderState(id, stateOrder));
  }, [dispatch, id, stateOrder]);

  return (
    <div>
      <div className="ml-4 grid grid-cols-2 xl:grid-cols-4 gap-2 items-center md:mx-4 my-2">
        <p className="w-44">
          <span className="font-bold mr-4 "># {index + 1}</span>
          {userInfo}
        </p>
        <DetailOrder
          productsInfo={productsInfo}
          userInfo={userInfo}
          shopId={shopId}
          total={total}
        />
        <select
          onChange={(e) => setStateOrder(e.target.value)}
          className="w-30 md:w-56 p-2 focus:outline-none bg-isabelline rounded-md"
        >
          <option value={newState[state]}>{newState[state]}</option>
          {newState.map((stateOrder, i) => (
            <option key={i} value={stateOrder}>
              {stateOrder}
            </option>
          ))}
        </select>
        <p className="w-16 ml-16 sm:ml-48 md:w-32 md:ml-32 p-2 font-bold text-right bg-green-200">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </p>
      </div>
      <hr></hr>
    </div>
  );
}

export default Order;
