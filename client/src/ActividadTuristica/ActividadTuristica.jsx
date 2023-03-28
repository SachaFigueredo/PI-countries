import { useEffect, useState } from "react"


import {useDispatch, useSelector} from 'react-redux'
import { crearactividad ,obtenerpaises} from "../Redux/Actions"
export default function ActividadTuristica(){
    
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(obtenerpaises())
  },[dispatch])
  const paises=useSelector(state=>state.TodoslospaisesRespaldo)

    const [actividad,setActividad]=useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countries:[]
    })
    
    const handleChange=(e)=>setActividad({
        ...actividad,
        [e.target.name]:e.target.value
    },
    console.log(actividad)
    )

    const handlerSelectCountry = (event) => {
        setActividad({
            ...actividad,
            countries: [...new Set([...actividad.countries, event.target.value])]
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(crearactividad(actividad))
    }
    
    const handlerDelete = (event) =>{
        setActividad({
            ...actividad,
            countries:actividad.countries.filter(e=>e!==event.target.value)
        })
    }
    

    return(
        <div>
            <form>
                <label htmlFor=""> nombre</label>
                <input onChange={handleChange} name="name" type="text" /><br />
                <div>
                <label>Duration: </label>
                <input type='number' name='duration' placeholder='Hrs...'  onChange={handleChange}
                required min='1' max='24' value={actividad.duration} ></input>
                {/* {errors.duration && <p>{errors.duration}</p>} */}
                </div>

                <div>
                    <label>Season: </label>
                    <label> <input type="radio" required name="season" value="Summer" onChange={handleChange}/>Summer</label>
                    <label> <input type="radio" required name="season" value="Winter" onChange={handleChange}/>Winter</label>
                    <label> <input type="radio" required name="season" value="Spring" onChange={handleChange}/>Spring</label>
                    <label> <input type="radio" required name="season" value="Autumn" onChange={handleChange}/>Autumn</label>
                    {/* {errors.season && <p>{errors.season}</p>} */}
                </div>

                <div>
                    <label>difficulty: </label>
                    <label> <input type="radio" required name="difficulty" value="1" onChange={handleChange}/>1</label>
                    <label> <input type="radio" required name="difficulty" value="2" onChange={handleChange}/>2</label>
                    <label> <input type="radio" required name="difficulty" value="3" onChange={handleChange}/>3</label>
                    <label> <input type="radio" required name="difficulty" value="4" onChange={handleChange}/>4</label>
                    <label> <input type="radio" required name="difficulty" value="5" onChange={handleChange}/>5</label>

                    {/* {errors.difficulty && <p>{errors.difficulty}</p>} */}
                </div>


                

                
                <div>
                    <label>Countries: </label>
                    <select name="countries" onChange={handlerSelectCountry} multiple={false} defaultValue='default'>
                        <option hidden value='default'>Select countries...</option>
                        {paises.map(country => 
                            <option key={country.id} value={country.name}>{country.name}</option>)}
                    </select>

                </div>

                <div>
                    {actividad.countries.map(country=>
                        <div key={country}   >{country}
                        <button value={country} onClick={handlerDelete} >x</button>
                        </div>)}
                </div>




        <button onClick={handleSubmit}> crear</button>
            </form>
        </div>
    )
}