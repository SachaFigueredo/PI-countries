import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useLocation } from "react-router-dom"
import { obtenerporid } from "../Redux/Actions"
import style from '../Details/Details.module.css'
export default function Details (){
    const midir =useLocation().pathname.slice(9)
    const dispatch =useDispatch()

    useEffect(()=>{
        dispatch(obtenerporid(midir))
    },[])
    const Pais=useSelector(state=>state.Paisactual)
    const array= Pais.activities && Pais.activities.map(i=>i.name)
    const actividades= array &&array.filter((item, pos) => array.indexOf(item) === pos).join(',')
    return (

        <div className={style.container}>
            <h1>{Pais&&Pais.name} </h1>
            <h3>{Pais&&Pais.id} </h3>
            <img src={Pais&&Pais.flags} alt="" /><br />
            {Pais&&<span>Capital : {Pais.capital}</span> } <br />
            {Pais&&<span>Poblacion : {Pais.population}</span> } <br />
            {Pais&&<span>Continente : {Pais.continents}</span> } <br />
            {Pais&&<span>Area : {Pais.area}</span> } <br />
            {actividades?<span>Actividades:{actividades}</span>:
            <span> No posee actividades</span>}
        </div>
    )
}