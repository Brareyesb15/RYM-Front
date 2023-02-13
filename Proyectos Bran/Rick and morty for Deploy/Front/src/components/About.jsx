import React from "react";
import styled from "styled-components";

const Abot = styled.div `
position: relative;
left: 20%;
width: 75%;
color: white;
font-size: 30px;
padding-top: 30%;
text-align: justify;
`


export default function About() {

    return( 
        <Abot>
            Hola, mi nombre es Brandon Reyes y soy el 
            creador de esta app sobre Rick y Morty.  
            Espero que les sea útil, 
            MUCHAS GRACIAS!!!!!!
        </Abot>
    )

}

