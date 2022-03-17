import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getdataUser } from "../../../../redux/actions";
import { updateOrderState } from "../../../../redux/actions/actionsOrders";

function Order({ id, total, state, index, userId }) {
  const [stateOrder, setStateOrder] = useState("");
  const dispatch = useDispatch();
  // const dataUser = useSelector((state) => state.dataUser);

  const newState = [
    "pendienteDeProcesamiento",
    "creado",
    "procesando",
    "enviando",
    "completado",
    "cancelado",
  ];

  // useEffect(() => {
  //   // dispatch(getdataUser(userId));
  //   if (stateOrder !== "") {
  //   }
  // }, [dispatch, id, stateOrder, userId]);

  const onChangeState = (e) => {
    e.preventDefault();
    setStateOrder({
      [e.target.name]: e.target.value,
    });
    dispatch(updateOrderState(id, stateOrder));
  };

  return (
    <div>
      <div className="grid grid-flow-col mx-4 my-2">
        <p className="w-72">
          <span className="font-bold mr-4"># {index + 1}</span>
          {id}
        </p>
        <select
          className=" w-56 pl-2 focus:outline-none bg-isabelline rounded-md"
          onChange={onChangeState}
        >
          <option value={newState[state]}>
            {newState[state]}
          </option>
          {newState.map((stateOrder, i) => (
            <option key={i} value={stateOrder}>
              {stateOrder}
            </option>
          ))}
        </select>
        <p className="relative text-right">
          <span className="absolute right-12 font-bold">$</span>
          {total}
        </p>
      </div>
      <hr></hr>
    </div>
  );
}

export default Order;
