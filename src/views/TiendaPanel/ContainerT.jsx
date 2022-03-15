import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideLeft from "./left/SideLeft";
import SideRight from "./right/SideRight";
import Loading from "../../components/loading/Loading";
import {
  getProductShop,
  loading,
  getdataUser,
  getallproducts,
  reset,
  stop,
} from "../../redux/actions";

export default function ContainerT({ user }) {
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productos = useSelector((state) => state.productsloaded);
  const cargando = useSelector((state) => state.isLoading);
  const usuario = useSelector((state) => state.dataUser);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const pages = productos.pagesTotal;
   console.log(usuario.rol, 'user');
   console.log(currentPage);

  const paging = (num) => {
    if (num >= 0 && num <= pages) {
      setCurrentPage(num);
    }
  };

  useEffect(() => {
    dispatch(loading());
    dispatch(getdataUser(userId));

    if (usuario?.rol === 2) {
      dispatch(getallproducts(currentPage));
    } else if (usuario?.rol === 1) {
      dispatch(getProductShop(usuario?.shopsId, currentPage));
    } else if (usuario?.rol === 0) {
      dispatch(stop());
    }

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, currentPage, usuario.rol]);

  return (
    <>
      {cargando ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          {/* Lado Izquierdo */}
          <div className="col-span-1">
            <SideLeft
              name={user.name}
              setId={setId}
              rol={usuario.rol}
              shopsId={usuario.shopsId}
            />
          </div>
          {/* Lado Derecho */}
          <div className="col-span-3">
            <SideRight
              product={productos}
              idS={id}
              shopsId={usuario?.shopsId}
              paging={paging}
              currentPage={currentPage}
              next={productos.next}
              prev={productos.prev}
              pagesTotal={productos.pagesTotal}
            />
          </div>
        </div>
      )}
    </>
  );
}
