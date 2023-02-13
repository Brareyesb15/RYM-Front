import React from "react";
import styled from "styled-components";

const Superior = styled.div `
background-image: url(https://upload.wikimedia.org/wikipedia/commons/9/9e/Rick_and_Morty_title_card.png);
background-position: center;
background-size: cover;
background-attachment: fixed;
width: 1000px;
height: 200px;
`


export default function Encabezado() {
    return (
        <Superior>Loco sirve</Superior>
    )
}