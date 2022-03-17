import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByShop } from "../../../../redux/actions/actionsOrders";
import Order from "./Order";

function Orders({ shopId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [filterOrder, setFilterOrder] = useState("");

  const newState = [
    "pendienteDeProcesamiento",
    "creado",
    "procesando",
    "enviando",
    "completado",
    "cancelado",
  ];

  const filter = orders.filter(
    (order) => order.state === newState.indexOf(filterOrder)
  );

  useEffect(() => {
    dispatch(getOrderByShop(shopId));
  }, [dispatch, shopId]);
  console.log("orders", orders);

  return (
    <div className="w-11/12 h-11/12 p-4 bg-isabelline">
      <h2 className="mb-2 text-center text-2xl font-bold">Estado de ordenes</h2>
      <div className="flex justify-between mb-3">
        <p>Nº de Order</p>
        <div className="flex">
          <p>Estado de Order</p>
          <select
            onChange={(e) => setFilterOrder(e.target.value)}
            className="ml-4"
          >
            <option value="">Todas las Ordenes</option>
            {newState.map((stateOrter) => (
              <option value={stateOrter}>{stateOrter}</option>
            ))}
          </select>
        </div>
        <p>Total</p>
      </div>
      {filterOrder === ""
        ? orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              state={order.state}
              total={order.total}
            />
          ))
        : filter?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              state={order.state}
              total={order.total}
            />
          ))}
    </div>
  );
}

export default Orders;
