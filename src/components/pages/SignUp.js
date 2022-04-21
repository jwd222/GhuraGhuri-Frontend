import React from 'react'
import '../../App.css'
import { useState } from "react";
import useSignUpForm from '../useSignUpForm'
import validateInfoSignUp from '../validateInfoSignUp';
import './SignUp.css'
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';


function SignUp() {
    const history = createBrowserHistory({forceRefresh:true});
    const { handleChange, values, handleSubmit, errors } = useSignUpForm(validateInfoSignUp);
    const [name, setUserName] = useState("");
    const [email, setUserMail] = useState("");
    const [password, setUserPassword] = useState("");
    const address="";
    const area="";
    const addUser=(e)=>
    { e.preventDefault();
        const user={name, email, password, area, address};
        console.log(user);
        fetch("http://localhost:8081/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{console.log("New User added");
        history.push({
            pathname: '/login',
            state :{
            data: 'New account has been created.'
          }});}
        )

    }
   

    return (
        <div className='container'>
            <div className='signup-content'>
                <form action='/' method="POST" className='signupform' onSubmit={(e) => { 
                    handleSubmit(e); 
                    addUser(e);
                    }}>
                    <h1>
                        Join us by filling the information below!
                    </h1>
                
                    <div className='signupinputs'>
                        <label htmlFor='username'
                            className='form-label'>
                            User-Name
                        </label>
                        <input id='username' type='text'
                            name='username'
                            className='signupinput'
                            placeholder='Enter your username'
                            value={values.username}
                            onChange={(e) => {
                                const selectedState = e.target.value;
                                setUserName(selectedState);
                                handleChange(e);
                            }} />
                        {errors.username && <p>{errors.username}</p>}
                    </div>
                    <div className='signupinputs'>
                        <label htmlFor='email'
                            className='form-label'>
                            Email
                        </label>
                        <input id='email' type='email'
                            name='email'
                            className='signupinput'
                            placeholder='Enter your email'
                            value={values.email}
                            onChange={(e) => {
                                const selectedState = e.target.value;
                                setUserMail(selectedState);
                                handleChange(e);
                            }}></input>
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className='signupinputs'>
                        <label htmlFor='password'
                            className='form-label'>
                            Password
                        </label>
                        <input id='password' type='password'
                            name='password'
                            className='signupinput'
                            placeholder='Enter your password'
                            value={values.password}
                            onChange={(e) => {
                                const selectedState = e.target.value;
                                setUserPassword(selectedState);
                                handleChange(e);
                            }}></input>
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className='signupinputs'>
                        <label htmlFor='password2'
                            className='form-label'>
                            Confirm Password
                        </label>
                        <input id='password2' type='password'
                            name='password2'
                            className='signupinput'
                            placeholder='Confirm password'
                            value={values.password2}
                            onChange={handleChange}></input>
                        {errors.password2 && <p>{errors.password2}</p>}
                    </div>

                    <button className='signup-input-btn' type='submit'>SIGN UP</button>
                    <span className='go-to-login'>Already a member? <a href='/login'>Login here</a></span>
                </form>
            </div>
        </div>
    )
}

export default SignUp