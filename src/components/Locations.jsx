import React from "react";  
import {useState} from "react";
import {useParams} from "react-router-dom" 
import {useEffect} from "react";
import { NavLink}    from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";


const Detail = styled.div`
position: relative;
left: 20%;
width: 75%;
color: white;
font-size: 25px;
text-align: center;
`;

const ResidentsList = styled.ul`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

const Resident = styled.li`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
`;

const StyledNavLink = styled(NavLink)`
color: white;
text-decoration: none;

&:active,
&:hover {
color: #00f;
}
`;


export default function Location(props) {
    const locaciones = useSelector(state => state.locaciones)
    const mapear = locaciones[0]
 

return (
    <Detail>
      <StyledNavLink to={"/Home"}>GoBack</StyledNavLink>
      <h2>Locations: </h2>
      <ResidentsList>
        {mapear.map((location) => (
          <Resident key={location.id}>
            <StyledNavLink to={`/LocationDetail/${location.id}`}>
              <h3>{location.name}</h3>
              <p>Type: {location.type}</p>
            </StyledNavLink>
          </Resident>
        ))}
      </ResidentsList>
    </Detail>
  );
}