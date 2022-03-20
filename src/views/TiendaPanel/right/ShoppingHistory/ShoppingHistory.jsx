import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loading_panel } from "../../../../redux/actions/index";
import { getOrderByShop } from "../../../../redux/actions/actionsOrders";
import Loading from "../../../../components/loading/Loading";
import Buys from "./Buys";
import shopping from "../../../../img/shopping.png";

function ShoppingHistory({ userId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cargando = useSelector((state) => state.loadingPanel);

  useEffect(() => {
    dispatch(loading_panel());
    dispatch(getOrderByShop(userId));
  }, [dispatch, userId]);

  // console.log("ordenes de compra", orders);

  return (
    <div>
      {cargando ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-full bg-white rounded-lg">
          <div className="overflow-y-auto">
            {orders?.length === 0 ? (
              <div className="flex flex-col justify-center items-center p-4">
                <h5>Aún no has hecho compras</h5>
                <img src={shopping} alt="shopping bag" className="w-20 mt-4" />
              </div>
            ) : (
              orders?.map((order, i) => (
                <Buys
                  index={i}
                  key={order.id}
                  id={order.id}
                  shopId={order.shopId}
                  state={order.state}
                  total={order.total}
                  userId={order.userId}
                  products={order.ordenProductsId}
                  shopInfo={order.shopInfo}
                  productsInfo={order.productsInfo}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingHistory;
