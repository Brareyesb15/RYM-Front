import React from "react";
import SearchBar from "./SearchBar";
import {NavLink} from "react-router-dom"
import Card from "./Card";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
position: fixed;
width: 25%;
height: 100%;
float:left;
font-size: 25px;
color: white;
 display:flex;
 flex-wrap: wrap;
 flex-direction: row;
align-items: center;
padding: 30px;

`
const Cont = styled.div `



`

const NavLinkStyled= styled(NavLink)`
color: white;
   text-decoration: none;

&:active,
&:hover {
color: #00f;
}
`;


export default function Navito(props) {
   const location = useLocation()

    return (
       <NavBar>
          <Cont>
                <NavLinkStyled to={"/Home"}>Home</NavLinkStyled>
                <br></br>
                <NavLinkStyled to ={"/Favorites"}>Favoritos</NavLinkStyled>
                <br></br>
                <NavLinkStyled to={"/Locations"} >Locations</NavLinkStyled>
                <br></br>
                <NavLinkStyled to={"/About"} >About</NavLinkStyled>
                <br></br>
                {location.pathname !== "/" ? <NavLinkStyled   to={"/"}>Login</NavLinkStyled> : null}
                <br></br>
                <SearchBar onSearch={(props.onSearch)}/>
    

            </Cont> 
      
           </NavBar>
          
    
    
    )
}