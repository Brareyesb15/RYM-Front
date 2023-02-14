import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { filterCards, mostrarTodos } from "../Redux/action";
import { orderCards, deleteFavs} from "../Redux/action";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Contain = styled.div `
 display:flex;
 flex-wrap: wrap;
 flex-direction: column;
 padding: 5px;
 `
const FavStyled = styled.div `
display:flex;
 flex-wrap: wrap;
 flex-direction: row;
 `
 const Cont = styled.div`
 position: relative;
 left: 20%;
 width: 85%;
 color: white;
 font-size: 25;
 `
 const Cont1 = styled.div`
 width:50%;
 `
const Cont2 = styled.div`
width: 50%;
`
const ButtonFav = styled.button`    
color: blue;
`
const StyledNavLink = styled(NavLink)`
color: white;


&:active,
&:hover {
color: #00f;
}
`

export function Favorites(props) {
     const userID = props.userID
    const dispatch = useDispatch();
    
    function ordenar  (e)  {
        const copia = [...props.myFavorites] // este lo vas a tener que cambiar para el array favs del back o pedirle un personaje especifico solo con el ID. 
        if (e.target.value === "Ascendente" ) {
           
            let ascend = copia.sort((a, b) => a.id - b.id);
            dispatch(orderCards(ascend))
        
        }   
       if (e.target.value === "Descendente") {
            let descend = copia.sort((a,b) =>  b.id- a.id )
            dispatch(orderCards(descend))
        }
    }
     function filtrar   (e)  {
        if (e.target.value === "Todos") {
            dispatch(mostrarTodos())

        }
    else dispatch(filterCards(e.target.value))
     }
     
     const handleFavorite = (id) => {
    
        dispatch(deleteFavs({id,userID}))
     }

    return (
        <Cont>
        <div>
            <div>
            <select onChange= {ordenar}>
                <option value="Ascendente" >Ascendente</option>
                <option value="Descendente" >Descendente</option>
            </select>
            <select onChange = {filtrar}>
                <option value="Todos">Todos</option>
                <option value="Male" >Masculino</option>
                <option value="Female" >Femenino</option>
                <option value="Genderless" >Sin genero</option>
                <option value="Unknown" >Desconocido</option>
            </select>
            </div>
         <Contain>
                {props.myFavorites?.map((t,i) => (<FavStyled key={i}>  
        <Cont1>
        <ButtonFav onClick={() => handleFavorite(t.id)}>❤️</ButtonFav>
        <StyledNavLink to={`/detail/${t.id}`} > <h2>{t.name}</h2>  </StyledNavLink> 
            <h3>Especie: {t.species}</h3>
            <h3>Genero: {t.gender}</h3>
            <h3>Estado: {t.status}</h3>
        </Cont1>
        <Cont2>
        <img  src={t.image} alt={t.name} />   
        </Cont2>
      
        </FavStyled>
        ))} 
        </Contain>       
   </div>
   </Cont>


    )




}

export function mapStateToProps(state) {
    return {
       myFavorites : state.myFavorites,
       allCharacters: state.allCharacters,
       userID : state.userID
    }
 }
 export default connect(mapStateToProps, null)(Favorites);