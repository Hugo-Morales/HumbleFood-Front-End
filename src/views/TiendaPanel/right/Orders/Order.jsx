import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderState } from "../../../../redux/actions/actionsOrders";

function Order({ id, total }) {
  const [stateOrder, setStateOrder] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateOrderState(id, stateOrder));
  }, [dispatch, id, stateOrder]);

  console.log(id);
  console.log(stateOrder);
  return (
    <div className="flex justify-between mb-2">
      <p>{id}</p>
      <select onChange={(e) => setStateOrder(e.target.value)}>
        <option value="pendienteDeProcesamiento">
          Pendiente De Procesamiento{" "}
        </option>
        <option value="creado">Creado</option>
        <option value="procesando">Procesando</option>
        <option value="enviando">Enviando</option>
        <option value="completado">Completado</option>
        <option value="cancelado">Cancelado</option>
      </select>
      <div>hola</div>
      <p>{total}</p>
    </div>
  );
}

export default Order;
