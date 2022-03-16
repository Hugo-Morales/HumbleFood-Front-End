import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderState } from "../../../../redux/actions/actionsOrders";

function Order({ id, total, state }) {
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

  console.log("newState", newState[state]);

  // if(state === 0){
  //   return "pendienteDeProcesamiento"
  // } else {
  //   return newState;
  // }

  useEffect(() => {
    dispatch(updateOrderState(id, stateOrder));
  }, [dispatch, id, stateOrder]);

  // console.log(id);
  // console.log(stateOrder);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p>{id}</p>
        <select onChange={(e) => setStateOrder(e.target.value)}>
          <option value={newState[state]}>{newState[state]}</option>
          {newState.map((stateOrder) => (
            <option value={stateOrder}>{stateOrder}</option>
          ))}
        </select>
        <p>{total}</p>
      </div>
      <hr></hr>
    </div>
  );
}

export default Order;
