import axios from 'axios'

export const OBTENER_PAISES='OBTENER_PAISES'
export const OBTENER_POR_NOMBRE='OBTENER_POR_NOMBRE'
export const RESET_BUSQUEDA ='RESET_BUSQUEDA'
export const OBTENER_POR_CONTINENTE ="OBTENER_POR_CONTINENTE"
export const ORDENAR_ALFABETICAMENTE="ORDENAR_ALFABETICAMENTE"
export const CREAR_ACTIVIDAD ="CREAR_ACTIVIDAD"
export const FILTRAR_POR_ACTIVIDAD='FILTRAR_POR_ACTIVIDAD'
export const OBTENER_POR_ID="OBTENER_POR_ID"
export const OBTENER_POR_CAPITAL="OBTENER_POR_CAPITAL"

export const obtenerpaises=()=>{
return async (dispatch)=>{
const paises= await axios.get('http://localhost:3001/')///aca es donde se hace la conexion del back con el front 
    return dispatch({type: OBTENER_PAISES,payload:paises.data})
}
}
export const obtenerpornombre=(nombre)=>{
return  {
    type:OBTENER_POR_NOMBRE,payload:nombre}
}
export const resetbusqueda=()=>{
return{type:RESET_BUSQUEDA}
}
export const obtenerporcontinente=(continente)=>{
return {
    type:OBTENER_POR_CONTINENTE,payload:continente
}
}

export const ordenaralfabeticamente = (value)=>{
return {
        type : ORDENAR_ALFABETICAMENTE,
        payload: value
} 
}
export const crearactividad = (actividad)=>{
return async (dispatch)=>{
const url=await axios.post('http://localhost:3001',actividad)
return dispatch({type:CREAR_ACTIVIDAD})
}
}

export const filtrarporactividad =(actividad)=>{
return {
    type: FILTRAR_POR_ACTIVIDAD,payload:actividad}
}

export const obtenerporid =(id)=>{
    return async (dispatch)=>{
    const paises= await axios.get(`http://localhost:3001/${id}`)
    return dispatch({ type: OBTENER_POR_ID,payload:paises.data})
}
}

export const obtenerporcapital=(nombredecapital)=>{
    return {
        type:OBTENER_POR_CAPITAL,payload:nombredecapital}
}
