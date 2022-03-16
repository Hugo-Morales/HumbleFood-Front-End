import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByShop } from "../../../../redux/actions/actionsOrders";
import Order from "./Order";

function Orders({ shopId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  

  useEffect(() => {
    dispatch(getOrderByShop(shopId));
  }, [dispatch, shopId]);
  console.log("orders", orders);


  return (
    <div className="w-11/12 h-11/12 p-4 bg-isabelline">
      <h2 className="mb-2 text-center text-2xl font-bold">Estado de ordenes</h2>
      <div className="flex justify-between">
        <p>Nº de Order</p>
        <p>Estado de Order</p>
        <p>Total</p>
      </div>
      {orders &&
        orders?.map((order) => (
          <Order 
            key={order.id}
            id={order.id}
            total={order.total}
          />
        ))}
    </div>
  );
}

export default Orders;
