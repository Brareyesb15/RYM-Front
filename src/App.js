import React from 'react'
import styled from "styled-components"
import Navito from './components/navito.jsx'
import { useState } from 'react' 
import {Routes,Route} from "react-router-dom";
import About from './components/About'
import Details from "./components/Details"
import Form from './components/Form'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { guardaLocations } from './Redux/action';
import Favorites from "./components/Favorites"
import Home from './components/Home'
import axios from 'axios'
import Registro from './components/FormCreateUser'
import { useDispatch } from "react-redux";
import { guardaid } from './Redux/action'
import LocationDetail from "./components/LocationDetail"
import Locations from "./components/Locations";

const  AppStyle = styled.div `
background-image: url(https://i.pinimg.com/originals/75/05/b8/7505b82d6702785ce20ebedce92c63ad.png);
   background-position: center;
   background-size: cover;
   background-attachment: fixed;
padding:  0px 0px 2000px; 
display:flex;
flex-direction: row;


` 


export default function App () {
const [characters,setCharacters] = useState([]);
const location = useLocation()   
const [access,setAccess] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch();

const login = async(datos) => {
   const resp = await axios.post("/user/validate",{
      email : datos.email,
      password: datos.password,
   })
      if(resp.data.id !== false){
      setAccess(true);
      navigate('/Home');
      dispatch(guardaid(resp.data.id))
      dispatch(guardaLocations())
      
   }
    else window.alert("Cuenta o contraseña incorrectas")
}

const registro = async(userData) => {
   const resp = await axios.post("/user/",{
      email : userData.email,
      password:userData.password,
      username: userData.username
   })
   window.alert(resp.data)
   navigate('/')
}

useEffect(() => {
   !access && navigate('/');
}, [access]);


const onSearch = async(num) => {
   const data = await axios(`/all/dbdata/${num}`)
   
          // eslint-disable-next-line eqeqeq
          if(characters.find(function(elemento) {return elemento.id == num? true : false}))   {
            window.alert ("Personaje ya encontrado")
     
          }
          else if (data.data.name ) {
             setCharacters((oldChars) => [...oldChars, data.data]);
          } else {
             window.alert('No hay personajes con ese ID');
          }
       };  
 
 const onClose =(id) =>{
  setCharacters(characters.filter((char) => char.id !== id));
 };

 // en el location.pathname ? va null, recuerda.

return ( 
   <AppStyle>
     
         {location.pathname === "/" || location.pathname === "/register" ? null : <Navito onSearch={onSearch}></Navito> }
      
       
             <Routes>
               <Route path="/Home" element={
                  <Home
                     characters={characters}
                     onClose={onClose}/>}>
               </Route>
               <Route path="/Locations" element={<Locations />}></Route>
               <Route path="/LocationDetail/:id" element={<LocationDetail />}></Route>
               <Route path="/Favorites" element={<Favorites />}></Route>
               <Route path="/About" element={<About />}></Route>
               <Route path="/detail/:id" element={<Details />}></Route> 
               <Route path= "/" element = {<Form login={login}/>}></Route>
               <Route path= "/register" element = {<Registro registro={registro}/>}></Route>
               </Routes>
         

   
   </AppStyle>)}




// CON LOS CAMBIOS DEL BACKEND REDUX EMPIEZA A PERDER SENTIDO. REVISA LAS ACTIONS, LA REALIDAD ES QUE YA NO SE ESTÁN UTILIZANDO. ACÁ EN APP SE 
// UTILIZA EL ESTADO DEL COMPONENTE CHARACTERS. LA ÚNICA FORMA DE QUE REDUX TENGA SENTIDO EN ESTA APP ES QUE CHARACTERS HAGA PARTE DEL ESTADO GLOBAL,
// NO DEL ESTADO DE ESTE COMPONENTE SOLAMENTE. 