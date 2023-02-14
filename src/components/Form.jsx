import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"


const StyledNavLink = styled(NavLink)`
color: white;
text-decoration: none;

&:active,
&:hover {
color: #00f;
}
`;
const FormCentrado = styled.div `
border: 3px;
background-color: white ;
display: flex;
align-items: center;
justify-content: center;
`

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export function validate(userData) {
    let errors = {}
    if (!emailRegex.test(userData.email)) {errors.email = "El username debe ser un email"};
    if (!userData.email) {errors.email = "el nombre de usuario no puede estar vacio"};
    if (userData.email.length > 35) {errors.email = "el nombre de usuario no puede contener más de 35 caracteres"}
    if (userData.password <= 0 ) {errors.password="la contraseña tiene que tener al menos un número"};
    if (userData.password.length < 6 || userData.password.length > 10 ) {errors.password="la contraseña tiene que tener una longitud entre 6 y 10 caracteres"}

  
    return errors;
  }

export default function Form (props) {  
    const [userData, setUserData] = React.useState({ email: '', password: 0 });
    const [errors,setErrors] = React.useState ({email: "", password: ""});

  function handleChange(e) {
    setErrors(validate({...userData,
      [e.target.name]: e.target.value}))
  
    setUserData({...userData,
      [e.target.name]: e.target.value})

  }
  function handleSubmit(e) {
    e.preventDefault();
    props.login(userData) 
  

 }


    return (
    <FormCentrado>
        <form onSubmit={handleSubmit}>
            <label>email:</label>
             <input   
                name="email" 
                placeholder="Escribe tu email..." 
                type="text"
                value={userData.email} 
                onChange={handleChange}></input>
                {errors.email ? <div>{errors.email}</div> : null}

                <br></br>
            <label>Password: </label>
             <input   
                name="password" 
                placeholder="Escribe tu contraseña..." 
                type="number" 
                value={userData.password} 
                onChange={handleChange}></input>
                {errors.password ? <p>{errors.password}</p> : null}
                <br></br>
              <button type="submit">Login</button>
              <NavLink to={"/register"}>Register</NavLink>
              </form>
        
    </FormCentrado>
    )
}