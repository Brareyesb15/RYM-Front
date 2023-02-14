import React from "react";
import styled from "styled-components";



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
    if (!emailRegex.test(userData.email)) {errors.email = "El email debe ser un email"};
    if (!userData.email) {errors.email = "el email de usuario no puede estar vacio"};
    if (userData.email.length > 35) {errors.email= "el email no puede contener más de 35 caracteres"}
    if (userData.password <= 0 ) {errors.password="la contraseña tiene que tener al menos un número"};
    if (userData.password.length < 6 || userData.password.length > 10 ) {errors.password="la contraseña tiene que tener una longitud entre 6 y 10 caracteres"}
    if (!userData.username) {errors.username = "el nombre de usuario no puede estar vacio"};
    if (userData.username.length > 35) {errors.username = "el nombre de usuario no puede contener más de 35 caracteres"}
  
    return errors;
  }

export default function Registro (props) {  
    const [userData, setUserData] = React.useState({ email: '', password: 0,username : "" });
    const [errors,setErrors] = React.useState ({email: "", password: "", username:""});

  function handleChange(e) {
    setErrors(validate({...userData,
      [e.target.name]: e.target.value}))
  
    setUserData({...userData,
      [e.target.name]: e.target.value})

  }
  function handleSubmit(e) {
    e.preventDefault();
    props.registro(userData) 
  

 }


    return (
    <FormCentrado>
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
             <input   
                name="email" 
                placeholder="Escribe tu email..." 
                type="text"
                value={userData.email} 
                onChange={handleChange}></input>
                {errors.email? <div>{errors.email}</div> : null}

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
                <label>Username:</label>
             <input   
                name="username" 
                placeholder="Escribe tu Username..." 
                type="text"
                value={userData.username} 
                onChange={handleChange}></input>
                {errors.username ? <div>{errors.username}</div> : null}
              <button type="submit">registrar</button>
              </form>
        
    </FormCentrado>
    )
}