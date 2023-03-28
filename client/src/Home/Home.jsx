import {useEffect, useState}  from 'react' 
import { useDispatch, useSelector} from 'react-redux'
import Barradebusqueda from '../Barradebusqueda/Barradebusqueda'
import Filtros from '../Filtros/Filtros'
import Paginado from '../Paginado/Paginado'
import { obtenerpaises, obtenerporcapital } from '../Redux/Actions'
import style from '../Home/Home.module.css'
import { Link } from 'react-router-dom'

export default function Home(){
const dispatch=useDispatch() 
useEffect(()=>{
        dispatch(obtenerpaises())
},[])
const Paises=useSelector(state=>state.Todoslospaises)      
const[actualPage,setActualpage]= useState(1)
const [countriesxpage,setCountriesxpage]=useState(10)
const indiceultimocountrie = actualPage * countriesxpage /// 1 * 15  = 15
const indiceprimercountrie = indiceultimocountrie -countriesxpage///15-1
const paisesactuales = Paises.slice(indiceprimercountrie,indiceultimocountrie)
const paginado = (actualPage)=>{
        setActualpage(actualPage) 
    }
const resetpagina = ()=>setActualpage(1)
const paginaanterior =()=>{ actualPage>1 ?  setActualpage(actualPage-1): alert("no se puede retroceder")}                            
const proximapagina =(e)=>{ actualPage<e.target.value?  setActualpage(actualPage+1): alert("no hay mas paginas")}
//const [capital,setCapital]= useState("")
// const buscarporcapital=(e)=>{
//     setCapital(e.target.value)
//     dispatch(obtenerporcapital(e.target.value)) 
//}
    return (
        <div>
                {/* <h1>busqueda</h1>
                <div>
                    <input type="text" value={capital} onChange={buscarporcapital}  />
                    <button> buscar</button>
                </div> */}

            <div>
                <h1> Paises</h1>
                <Paginado 
                    actualPage={actualPage}
                    total={Paises.length}
                    countriesxpage={countriesxpage} paginado={paginado}
                    prev={paginaanterior}
                    next={proximapagina}/>
            </div>
            <div>
                <Filtros resetpagina={resetpagina}/>
                <Barradebusqueda resetpagina={resetpagina}/> 
            </div> 
            <div className={style.Cardscontainer}>{paisesactuales.length?paisesactuales.map(((i, key)=>
                <Link key={key} to= {`/details/${i.id}` } className="about-link">
            <div className={style.cards}>
                    <h3 className={style.title}>{i.name} ({i.continents})</h3>
                    <img src={i.flags} alt="not found" 
                className={style.imagen} width={100} height ={100}/> <br />
            </div>
                </Link> )):<h1>Cargando...</h1>  }
            </div>
                <Paginado actualPage={actualPage}total={Paises.length}countriesxpage={countriesxpage} paginado={paginado}/>
            </div>
    )
}
