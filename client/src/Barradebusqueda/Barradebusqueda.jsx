import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerpornombre } from "../Redux/Actions"
import style from "../Barradebusqueda/Barradebusqueda.module.css"
export default function Barradebusqueda({resetpagina}){
    const [nombre,setNombre]=useState('')
    const dispatch =useDispatch() 
    const handleBusqueda=(e)=>{
    dispatch(obtenerpornombre(e.target.value))
    setNombre(e.target.value)
    resetpagina()
    }

    return (
    <div>
        <input type="text" className={style.Input} onChange={handleBusqueda} />
        <button >buscar</button>
    </div>
)
}