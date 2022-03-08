import React, {useState} from "react"
import { useParams } from "react-router-dom";
import Styles from "../landingpage/landingpage.module.css";
import StylesContainer from "./ContainerT.module.css"

export default function ContainerT(){

    const {idTienda} = useParams()
    console.log(idTienda);

    return (
        <div className={Styles.container}>
            <div className = {StylesContainer.container}>
                <button className={Styles.button}>
                    <span className={Styles.shadow}></span>
                    <span className={Styles.edge}></span>
                    <span className={`${Styles.front} ${Styles.text}`}>
                        Productos
                    </span>
                </button>
                <button className={Styles.button}>
                    <span className={Styles.shadow}></span>
                    <span className={Styles.edge}></span>
                    <span className={`${Styles.front} ${Styles.text}`}>
                        Ordenes
                    </span>
                </button>
            </div>

            
        </div>
    )



}