import React from "react";
import useLoginForm from '../useLoginForm'
import validateInfoLogin from '../validateInfoLogin';
import { useState } from "react";
import './Login.css'
import '../../App.js';
import { Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';


function Login() {
  const history = createBrowserHistory({forceRefresh:true});
  const { handleChange, values, handleSubmit, errors } = useLoginForm(validateInfoLogin);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginState, setLoginState] = useState("");
  const [email, setUserMail] = useState("");
  const [password, setUserPassword] = useState("");

const getAllUser = () => {
  fetch('http://localhost:8081/user/getAllUser', {
  }).then(response => response.json())
  .then(data => {console.log(data);})
};

const login = () => {
  fetch('http://localhost:8081/user/getByMail/mail?mail='+email, {
  }).then(response => response.json())
  .then(data => {
    console.log(data);
    if(data[0].email===null){
      setLoginState("Not registered. Please Sign up.");
    }
    else if(data[0].password!==password){
      setLoginState("Wrong credentials.");
    }
    else if(data[0].password===password)
    {localStorage.setItem('currentID', data[0].id);
    localStorage.setItem('email', data[0].email);
    history.push({
      pathname: '/home',
      data: data[0].id
    });}
  })
};

  return (
    <div className='container'>
      <div className='login-content'>
        <form className='loginform' onSubmit={(e) => { handleSubmit(e); login();}}>
          <h1>
            Log in to experience more!
          </h1>
          <div className='logininputs'>
            <label htmlFor='email'
              className='form-label'>
              Email
            </label>
            <input id='email' type='email'
              name='email'
              className='logininput'
              placeholder='Enter your email'
              value={values.email}
              onChange={(e) => {
                const selectedState = e.target.value;
                setUserMail(selectedState);
                handleChange(e);
            }}></input>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className='logininputs'>
            <label htmlFor='password'
              className='form-label'>
              Password
            </label>
            <input id='password' type='password'
              name='password'
              className='logininput'
              placeholder='Enter your password'
              value={values.password}
              onChange={(e) => {
                const selectedState = e.target.value;
                setUserPassword(selectedState);
                handleChange(e);
            }}></input>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button className='login-input-btn'>LOGIN</button>
          <span className='go-to-signup'>Don't have an account?<a href='/signup'> Sign-up here.</a></span>
        </form>
        <h1 className='loginstat'>{loginState}</h1>
      </div>
    </div>

  )
}

export default Login