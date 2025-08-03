import React from 'react'
import './Login.css'
import axios from 'axios'
import API from '../../Services/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
const Login = () => {

  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);
  const [loginFormData, setLoginFormData] = useState({

    email: '',
    password: '',
  });

  const inputHandler = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await API.post('/login', loginFormData);
      console.log(res.data);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate('/home');

      }, 6000);
    }
    catch (err) {
      setLogging(false);
      console.log(err);
      alert('Invalid Credentials. Try Again');
      navigate('/');
    }
  }


  return (
    logging === true ? <div className="loading"><Circles
      height="100"
      width="100"
      color="white"
      ariaLabel="circles-loading"
    /></div>
      :
      (
        <div className='login-div'>
          <div className="login">
            <div className="login-left">
              <p className='login-left-txt'> Login </p>
            </div>
            <div className="login-right">
              <form onSubmit={submitHandler}>
                <input type="text" placeholder="Email" name='email' onChange={inputHandler} />
                <input type="password" placeholder="Password" name='password' onChange={inputHandler} />
                <button type="submit">Login</button>
                <div className="not-registered">
                  <p>Not Registered? <a href="/register">Register Here</a></p>
                </div>
              </form>
            </div>

          </div>
        </div>
      )
  )
}

export default Login