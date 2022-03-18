import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByShop } from "../../../../redux/actions/actionsOrders";
import { loading_panel } from "../../../../redux/actions/index";
import Loading from "../../../../components/loading/Loading";
import Order from "./Order";

function Orders({ shopId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cargando = useSelector((state) => state.loadingPanel);

  const [filterOrder, setFilterOrder] = useState("");

  const newState = [
    "pendienteDeProcesamiento",
    "creado",
    "procesando",
    "enviando",
    "completado",
    "cancelado",
  ];

  const filter = orders?.filter(
    (order) => order.state === newState.indexOf(filterOrder)
  );

  // console.log(orders);

  useEffect(() => {
    dispatch(loading_panel());
    dispatch(getOrderByShop(shopId));
  }, [dispatch, shopId]);

  return (
    <div>
      {cargando ? (
        <div className="flex justify-center items-center bg-white">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-full bg-white rounded-lg">
          <h2 className="w-full mb-2 p-4 text-center text-2xl font-bold rounded-t-lg text-white bg-ochre">
            Estado de ordenes
          </h2>
          <div className="flex justify-between mb-3 m-4">
            <p className="font-extrabold">Nº de Order</p>
            <div className="flex">
              <select
                onChange={(e) => setFilterOrder(e.target.value)}
                className="w-56 ml-32 pl-2 text-white rounded-md focus:outline-none bg-gray-700"
              >
                <option value="">Todas las Ordenes</option>
                {newState.map((stateOrter, i) => (
                  <option key={i} value={stateOrter}>
                    {stateOrter}
                  </option>
                ))}
              </select>
            </div>
            <p className="font-extrabold">Total de la Orden</p>
          </div>
          <div className=" overflow-y-auto">
            {filterOrder === ""
              ? orders?.map((order, i) => (
                  <Order
                    index={i}
                    key={order.id}
                    id={order.id}
                    state={order.state}
                    total={order.total}
                    userId={order.userId}
                    userInfo={order.userInfo?.name}
                    productsInfo={order.productsInfo}
                  />
                ))
              : filter?.map((order, i) => (
                  <Order
                    index={i}
                    key={order.id}
                    id={order.id}
                    state={order.state}
                    total={order.total}
                    userId={order.userId}
                    userInfo={order.userInfo?.name}
                    productsInfo={order.productsInfo}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
