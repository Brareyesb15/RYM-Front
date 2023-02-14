import React from "react";
import Cards from "./Cards";
import styled from "styled-components";

const Cont = styled.div`
position: relative;
left: 20%;

width: 85%;
color: white;
font-size: 25;

`



export default function Home(props) {
    console.log("home", props)

return (
    <Cont>
        <Cards
            characters={props.characters}
            onClose={props.onClose} />
    </Cont>
)
}