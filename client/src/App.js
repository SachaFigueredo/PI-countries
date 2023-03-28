import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import Home from './Home/Home';
import Nav from './Nav/Nav';
import ActividadTuristica from './ActividadTuristica/ActividadTuristica';
import Details from './Details/Details';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Route path='/' render={()=>window.location.pathname!=='/'?<Nav/>:null}/>
      <Route exact path='/' component ={LandingPage} />
      <Route exact path='/home' component ={Home} />  
      <Route exact path='/crearactividad' component ={ActividadTuristica}/>
      <Route  path='/details' component ={Details}/>
    </div> 
  </BrowserRouter>
  );
}

export default App;
