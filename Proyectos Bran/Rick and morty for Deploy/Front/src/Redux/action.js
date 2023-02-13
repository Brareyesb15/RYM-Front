import { ADD_FAVS, DELETE_FAVS, ORDER, FILTER,MOSTRAR, GUARDARID,GUARDALOCATIONS} from "./types"
import  axios  from "axios"

export function addFavs(props) {
    const {id,userID} = props;
    return async function (dispatch) {
        try{
           await axios.post(`http://localhost:3001/fav/add`, {id,userID})
                dispatch({
                    type: ADD_FAVS,
                    payload: props  
                });
        }catch(error){
            console.log(error)
          }
      };
}
    

export function deleteFavs(props) {
    const {id,userID} = props;
    console.log("estamos en deletefavsaccion",props,id,userID)
    return async function (dispatch) {
        try{
           let response = await axios.delete(`http://localhost:3001/fav/delete?id=${id}&userID=${userID}`) 
                dispatch({
                    type: DELETE_FAVS,
                    payload: props.id
                });
        }catch(error){
            console.log(error)
        }
    };
}

export function filterCards(gender) {
    return {
        type: FILTER,
        payload: gender
    }
}

export function orderCards(orden){
    return {
        type: ORDER,
        payload: orden
    }
}

export function mostrarTodos(){
    return {
        type: MOSTRAR
    } 
}
export function guardaid(id){
    console.log("estamos en actions",id)
    return async function (dispatch) {
        try{
           let response = await axios.get(`http://localhost:3001/fav/obtener/${id}`);
       
           dispatch({
        type: GUARDARID,
        payload: {
            id : id,
            response : response.data 
    }
})
        }catch(error){
            console.log(error)
}
    }}

export function guardaLocations(){
    
    return async function (dispatch){
        try{ 
            let response = await axios.get(`http://localhost:3001/all/allLocation`);
            dispatch({
                type: GUARDALOCATIONS,
                payload: response.data})
            
        }
        catch(error){
            console.log(error.message)
        }
    }
}


// Como no escribir try catch a través de async await 