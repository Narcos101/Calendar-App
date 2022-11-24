import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css"
import { Link } from 'react-router-dom';
import validator from "validator"

const RegisterPage = () => {

    
    const useSignUpForm = callback => {
        const [errorMessage, setErrorMessage] = useState({
            password:"",
            confirmPassword:""
        })
     
    
        const validatePassword = (value) => {
            if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
            })) {
            setErrorMessage(errorMessage => ({
                ...errorMessage,
                password:'Is Strong Password'
              }));
            } else {
            setErrorMessage(errorMessage => ({
                ...errorMessage,
                password:'Is not a Strong Password'
            }));
            }
        }
    
        const validateConfirmPassword = (value) => {
            if (!inputs.confirmPassword) {
                setErrorMessage(errorMessage => ({
                    ...errorMessage,
                    confirmPassword:"Password confirmation is required"
                  }));
            } else if (inputs.confirmPassword !== inputs.password) {
                setErrorMessage(errorMessage => ({
                    ...errorMessage,
                    confirmPassword:"Password does not match confirmation password"
                }))
            }
            else if (inputs.confirmPassword === inputs.password){
                setErrorMessage(errorMessage => ({
                    ...errorMessage,
                    confirmPassword:" "
                }));
            }
            }
        const [inputs, setInputs] = useState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        let navigate = useNavigate()
       
        const handleRegistration = async (e)=>{
            e.preventDefault()
            const userData = {'username':inputs.username,'email':inputs.email,'password1':inputs.password,'password2':inputs.confirmPassword}
            const response = fetch("http://127.0.0.1:8000/register",{
                method:"POST",
                headers:{
                    'Content-type':"application/json"
                },
                body:JSON.stringify(userData)
            })
            const data = await response
            if(data.status === 200){
                navigate('/login')
            }
        } 
        const handleInputChange = event => {
          if(event.target.name === "password"){
            validatePassword(event.target.value)
          }
          if(event.target.name === "confirmPassword"){
            validateConfirmPassword(event.target.value)
          }
          setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
          }));
        };
        return {
            handleInputChange,
            inputs,
            errorMessage,
            handleRegistration
        };
    };

    
      
    const { inputs, handleInputChange, handleRegistration,errorMessage } = useSignUpForm();

    return (
    <div className="ultra-container">
    <div className="container">
        <div className="header">
          <h1>Registration Form</h1>
        </div>
        <form className="register-form" onSubmit={handleRegistration}>
          <input
            onChange={handleInputChange}
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Username"
          />
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            value={inputs.email}
            placeholder="Email"
          />
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            value={inputs.password}
            placeholder="Password"
          />   
            {errorMessage.password === '' ? null :
            <span style={{
            fontWeight: 'bold',
            color: 'red',
            }}>{errorMessage.password}</span>}

          <input
            onChange={handleInputChange}
            type="password"
            name="confirmPassword"
            value={inputs.confirmPassword}
            placeholder="Confirm Password"
          />
          {errorMessage.confirmPassword === '' ? null :
            <span style={{
            fontWeight: 'bold',
            color: 'red',
            }}>{errorMessage.confirmPassword}</span>}
          <button type="submit"> Submit</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <br/>
      </div>
    </div>
    )
}

export default RegisterPage