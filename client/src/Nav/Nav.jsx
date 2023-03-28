import { Link } from "react-router-dom";
import style from '../Nav/Nav.module.css'

export default function Nav (){
    return(
        <div className={style.Nav}>        
        <h1 className={style.hometitle}>Paises</h1>
        <Link to="/crearactividad">
        <button className={style.button}>
            Crear Actividades
            </button>
        </Link>  
        <Link to="/home">
        <button className={style.button}>HOME</button>
        </Link>  
        <Link to="/">
        <button className={style.button}>SALIR</button>
        </Link>  
    </div>
    )
}