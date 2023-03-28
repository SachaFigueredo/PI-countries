import { OBTENER_PAISES,OBTENER_POR_NOMBRE,RESET_BUSQUEDA,
    OBTENER_POR_CONTINENTE,ORDENAR_ALFABETICAMENTE,
    CREAR_ACTIVIDAD,FILTRAR_POR_ACTIVIDAD, OBTENER_POR_ID,OBTENER_POR_CAPITAL} from "./Actions"

const initialState={
    Todoslospaises:[],
    TodoslospaisesRespaldo:[],
    nombrespaises:[],
    Actividades:[],
    Paisactual:[]
}
export default function reducer(state=initialState,action){
    switch (action.type) {
        case OBTENER_PAISES:
        const paises = action.payload
        const names= action.payload.filter(i=>i.Activities.length>1).map(i=>i.Activities.map(a=>a.name)).join().split(',')//logica que ayuda a filtrar las actividades
        return{
            ...state,
            Todoslospaises:paises,
            TodoslospaisesRespaldo:paises,
            Actividades:names.filter((item,index)=>names.indexOf(item)===index)///nos quedamos sin actividades repetidas
}
        case OBTENER_POR_NOMBRE:
            const pais= action.payload.length>1?
            state.Todoslospaises.filter(i=>i.name.toUpperCase().includes(action.payload.toUpperCase())):
            state.TodoslospaisesRespaldo
        
        return {
            ...state,
            Todoslospaises:pais
        }
        case RESET_BUSQUEDA:    
    return{
        ...state,
        Todoslospaises:state.TodoslospaisesRespaldo
    }
        case OBTENER_POR_CONTINENTE:
            const Paises =  action.payload ==='por continente'?state.TodoslospaisesRespaldo:
                            state.TodoslospaisesRespaldo.filter(i=>i.continents===action.payload)
            return{
                ...state,
                Todoslospaises:Paises
            }
        case ORDENAR_ALFABETICAMENTE:
            const todoslospaises= state.Todoslospaises
            const paisesordenados = action.payload==='default'?todoslospaises:
            action.payload==='Ascendente'?[].concat(todoslospaises).sort((a,b)=>a.population - b.population):            
            action.payload==='Descendente'?[].concat(todoslospaises).sort((a,b)=>b.population - a.population):            
            action.payload==="A-Z"?[].concat(todoslospaises).sort((a,b)=>a.name > b.name?1:-1):            
            action.payload==="Z-A"?[].concat(todoslospaises).sort((a,b)=>a.name < b.name?1:-1):            
            state.TodoslospaisesRespaldo
        return{
            ...state,
            Todoslospaises:paisesordenados
    }
        case CREAR_ACTIVIDAD:
                return{
                    ...state
                }
        case FILTRAR_POR_ACTIVIDAD:        
        const filtrados= action.payload ==='Actividades'?state.TodoslospaisesRespaldo:state.TodoslospaisesRespaldo.filter(i=>i.Activities.filter(a=>a.name===action.payload).length)
                console.log(filtrados)
                return{
                    ...state,
                    Todoslospaises:filtrados
                }   
        case OBTENER_POR_ID:
            return{
                ...state,
                Paisactual:action.payload
                }
        case OBTENER_POR_CAPITAL:
            const paisencontrado =  state.Todoslospaises.filter(i=>i.capital.toLowerCase().includes(action.payload.toLowerCase()));
            const sinerror=action.payload.length ===2?state.TodoslospaisesRespaldo:paisencontrado
            return{
                ...state,
            Todoslospaises: sinerror
        }
    default:
        return{
            ...state
                }
        }
}