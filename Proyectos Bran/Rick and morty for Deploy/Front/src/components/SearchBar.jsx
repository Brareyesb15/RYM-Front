import React from "react";
import { useState } from "react";
import styled from "styled-components";


const BarStyled = styled.a`
float:left;
`

const ButtonStyle = styled.button `
 background-color: white;
    color: #050505;
    font-size: 50%;
    border-radius: 10px;
    padding: 10px 20px;
    width: 90%;
`
const InputStyle = styled.input `
width: 90%;
size: 100%;


`

export default function SearchBar(props) {
   const [character, setCharacter] = useState("");

   function cambiarCharacter (e) {
      setCharacter(e.target.value)
   }
   
   return ( 
      <BarStyled>
      <InputStyle type="search" name="search" id="" onChange={cambiarCharacter}></InputStyle>  
      <br></br>
      <ButtonStyle onClick={() => props.onSearch(character)}>Agregar</ButtonStyle> 
      </BarStyled>
   );
}