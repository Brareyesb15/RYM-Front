import React from "react";  
import {useState} from "react";
import {useParams} from "react-router-dom" 
import {useEffect} from "react";
import { NavLink}    from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Detail = styled.div `
position: relative;
left: 20%;
width: 75%;
color: white;
font-size: 30px;
text-align: center;
`
const StyledNavLink = styled(NavLink)`
color: white;


&:active,
&:hover {
color: #00f;
}
`;

export default function Details(props) {
  const {id} = useParams()
  console.log("IDDDD", id)
  const [character , setCharacter] = useState({})
  
  async function fetchData() {  
    const data = await axios(`/all/dbdata/${id}`);
    console.log("=====>",data.data)
    if (data.data.name) {
      setCharacter(data.data);
    } else {
      window.alert("No hay personajes con ese ID");
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  console.log("!!!!!!!!",character)
  return (
    <Detail>
        <StyledNavLink to={"/Home"}>GoBack</StyledNavLink>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name}></img>
      <h3>Status:   {character.status}</h3>
      <h3>Specie:   {character.species}</h3>
      <h3>Gender:   {character.gender}</h3>
      {character.location && (
        <StyledNavLink to={`/LocationDetail/${character.location.id}`} > <h3>Location:   {character.location.name}</h3> </StyledNavLink> //Pregunta si existen antes de renderizar, puede que no hayan llegado todavia al guardar el estado. 
      )}
      {character.origin && (
       <StyledNavLink to={`/LocationDetail/${character.location.id}`} > <h3>Origin:   {character.origin.name}</h3> </StyledNavLink>
      )}
    </Detail>
  )}