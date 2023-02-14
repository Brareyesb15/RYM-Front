import React from "react"
import styled from "styled-components"
import {NavLink} from "react-router-dom"
import { deleteFavs, addFavs } from "../Redux/action"
import { connect } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { Dispatch } from "react"
import { useDispatch } from "react-redux";


const CardStyle = styled.div`
display: flex;
border: 50px red;
margin: 25px;
flex-direction: column;
align-items: center;
justify-content: center;
background-image: url(https://i.pinimg.com/originals/97/86/ec/9786ec883756c755df35a331ff902f3b.png);
background-position: center;
   background-size: cover;
   border-radius: 50px;


`
const H2Style = styled.h2 ` 
color: white;
height: 25%;
text-align: center;
`
const ImgStyle = styled.img`
padding: 20px;
`

const ButtonStyle = styled.button `
height: 50%;
`

const Superior = styled.div `
position: relative;
padding-top: 20px;
align-items: baseline;
width: 85%;
display: flex;
justify-content: space-between;
flex-direction: wrap; 
`
const H3Style= styled.h3 ``

const StyledNavLink = styled(NavLink)`
color: white;
&:active,
&:hover {
color: #00f;
}
`

export function Card(props) {
   const [isFav, setIsFav] = React.useState(false)
   const dispatch = useDispatch();
   console.log("!!!!",isFav)   

  const handleFavorite = () => {
   if (isFav === true) {
      setIsFav(false); 
      dispatch(deleteFavs(props))} 
   else {
      setIsFav(true); 
      dispatch(addFavs(props))}
   }


      useEffect(() => { 
         props.allCharactersa.forEach((fav) => {
            if (fav.id === props.id) {
               setIsFav(true);
            }
         });
      }, [props.allCharactersa]);

   return (
      
      <CardStyle>
         <Superior>
         {isFav ? (<button onClick={handleFavorite}>❤️</button>) : (<ButtonStyle onClick={handleFavorite}>🤍</ButtonStyle>)}
         <StyledNavLink to={`/detail/${props.id}`} > <H2Style>{props.name}</H2Style> </StyledNavLink>
         <ButtonStyle onClick={props.onClose}>X</ButtonStyle>
         </Superior>
         <ImgStyle  src={props.image} alt={props.name} /> 
   
         <H3Style>Especie: {props.species}</H3Style>
         <H3Style>Genero: {props.gender}</H3Style>
       
         
      </CardStyle>
   );
}


export function mapStateToProps(state) {
   return {
      myFavorites : state.myFavorites,
      allCharactersa: state.allCharacters,
      userID : state.userID
   }
}

export default connect(mapStateToProps)(Card);
