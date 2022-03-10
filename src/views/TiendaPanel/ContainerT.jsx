import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideLeft from "./left/SideLeft";
import SideRight from './right/SideRight';
import Loading from '../../components/loading/Loading'
import { getProductShop, loading } from "../../redux/actions";

export default function ContainerT({ user }) {
    const [id, setId] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const productos = useSelector(state => state.productShop);
    const cargando = useSelector(state => state.isLoading);
    const dispatch = useDispatch();
    const { idTienda } = useParams();
    // console.log(user)

    const paging = (num) => {
        if (num >= 0 && num <= productos.pagesTotal) {
            setCurrentPage(num);
        }
    };

    // 6220243e7afb1f1e0718fe06
    useEffect(() => {
        dispatch(loading())
        dispatch(getProductShop(idTienda, currentPage));
        return () => {
            setCurrentPage(0)
        }
    }, [dispatch, idTienda, currentPage])

    return (
        <>
            {
                cargando ? (<Loading />) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
                        {/* Lado Izquierdo */}
                        <div className="col-span-1">
                            <SideLeft name={user.given_name ? user.given_name : user.nickname} setId={setId} />
                        </div>
                        {/* Lado Derecho */}
                        <div className="col-span-3">
                            <SideRight product={productos} idS={id} user={idTienda} paging={paging} currentPage={currentPage} next={productos.next} prev={productos.prev} pagesTotal={productos.pagesTotal} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
