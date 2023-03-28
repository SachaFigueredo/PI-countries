import { useDispatch, useSelector } from "react-redux"
import { obtenerporcontinente,ordenaralfabeticamente,filtrarporactividad } from "../Redux/Actions"
import style from '../Filtros/Filtros.module.css'

export default function Filtros ({resetpagina}){      
const dispatch=useDispatch()
const actividades=useSelector(state=>state.Actividades)
const handleChange =(e)=>{
        dispatch(obtenerporcontinente(e.target.value))
        resetpagina()
    }

    const handleFiltro =(e)=>{
        dispatch(ordenaralfabeticamente(e.target.value))
        resetpagina()
    }
    const handleFiltroActividad=(e)=>{
        dispatch(filtrarporactividad(e.target.value))
        resetpagina()
    }

    return(
        <div>
            <h1>Filtros</h1>
            <div>
                <select className={style.select} onChange={handleChange} >
                    <option  >por continente</option>
                    <option >Antarctica</option>
                    <option >South America</option>
                    <option >Africa</option>
                    <option >Europe</option>
                    <option >South America</option>
                    <option >Asia</option>
                    <option >Oceania</option>
                    <option >North America</option>
                </select>

                <select className={style.select} onChange={handleFiltro}>
                    <option >orden alf</option>
                    <option >A-Z</option>
                    <option >Z-A</option>
                </select>

                <select className={style.select} onChange={handleFiltro} >
                    <option >orden por poblacion</option>
                    <option >Ascendente</option>
                    <option >Descendente</option>
                </select>
                <select className={style.select} onChange={handleFiltroActividad} >
                    <option >Actividades</option> {
                        actividades&&actividades.map((i, key)=>
                    <option key={key} value={i}>{i}</option>)}
                </select>
            </div>

        </div>
)
}