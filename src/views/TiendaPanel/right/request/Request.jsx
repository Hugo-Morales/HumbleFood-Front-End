import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../components/loading/Loading";
import PaginationControlled from "../pagination";
import List from "./List";
import {
  loading_panel,
  getShopRequest,
  authorize,
  deleteShop,
} from "../../../../redux/actions";

export default function Request() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const cargando = useSelector((state) => state.loadingPanel);
  const list = useSelector((state) => state.allShops);

  console.log(currentPage);
  const paging = (num) => {
    if (num >= 0 && num <= list.pagesTotal) {
      setCurrentPage(num);
    }
  };

  useEffect(() => {
    dispatch(loading_panel());
    dispatch(getShopRequest(currentPage));
  }, [dispatch, currentPage]);

  const submit = (e, s) => {
    e.preventDefault();

    Swal.fire({
      title: `¿Deseas autorizar la tienda "${s.name}"?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      reverseButtons: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `"${s.name}" ya puede vender sus productos."`,
          text: "",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((r) => {
          dispatch(authorize(s.id, 1));
          if (r.isDismissed) {
            dispatch(loading_panel());
            dispatch(getShopRequest(currentPage));
          }
        });
      }
      if (result.isDenied) {
        dispatch(deleteShop(s.id));
        Swal.fire({
          title: `Fue rechazada la solicitud de registrar a "${s.name}".`,
          text: "",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((r) => {
          if (r.isDismissed) {
            dispatch(loading_panel());
            dispatch(getShopRequest(currentPage));
          }
        });
      }
    });
  };

  return (
    <>
      {cargando ? (
        <div className="flex justify-center items-center bg-white rounded-lg">
          <Loading />
        </div>
      ) : (
        <div className="bg-white rounded-lg">
          {list?.shops?.length ? (
            <>
              <List shops={list?.shops} submit={submit} />
              <PaginationControlled
                pagesTotal={list?.pagesTotal}
                paging={paging}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="text-center font-bold p-4 text-red-400">
              <h1>No hay ninguna solicitud para aprobar.</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}
