import style from '../LandingPage/LandingPage.module.css'
import { Link  } from 'react-router-dom'
export default function LandingPage (){

    return(
        <div className={style.Container}>
        <h1 className={style.Titulo} >Bienvenidos</h1>
            <p className={style.infotext}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Minima accusantium a architecto, quaerat ducimus nesciunt
                reprehenderit tenetur cumque saepe, ab dolore officia, 
                corporis excepturi. Fuga libero suscipit exercitationem
                quia obcaecati.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Amet qui aliquam illo totam voluptatibus adipisci ad error
                placeat dolorem quaerat atque, hic laborum
                ipsum blanditiis veritatis ullam dolor modi similique?
            </p>
            <Link to = '/home'>
                <button className={style.button}>Ir al home</button>
            </Link>
        </div>
    )
}