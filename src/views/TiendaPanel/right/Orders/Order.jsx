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
      <div className="grid grid-flow-col mx-4 my-2">
        <p className="w-44">
          <span className="font-bold mr-4"># {index + 1}</span>
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
          className="w-56 pl-2 focus:outline-none bg-isabelline rounded-md"
        >
          <option value={newState[state]}>{newState[state]}</option>
          {newState.map((stateOrder, i) => (
            <option key={i} value={stateOrder}>
              {stateOrder}
            </option>
          ))}
        </select>
        <p className="font-bold text-right">
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
