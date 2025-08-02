import React from 'react'
import './Register.css'
import axios from 'axios'
import { useState } from 'react'
import API from '../../Services/api'
import { useNavigate } from 'react-router-dom'
import { avatarPics } from '../../assets/assets'

const Register = () => {


  const navigate = useNavigate();
  const [avatarDivState, setAvatarPicState] = useState(false);
  const [logging , setLogging] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    status: '',
    nickname: '',
    avatar: '',
  });



  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await API.post('/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setTimeout(() => {
        navigate('/login');
        
      }, 3000);

    }
    catch (err) {
      console.log(err);
      alert ('Unable To Add-User At The Moment. Please Try Again Later..');
      navigate('/register');
    }
  }


  return (
    logging === true ? <div className="loading"><p>Loading</p></div>
      : 
    (
    <div className='register-div'>
      <div className="register">
        <div className="register-left">
          <p className='register-left-txt'>Register</p>
        </div>
        <div className="register-right">
          <form onSubmit={submitHandler}>
            <input type="text" placeholder='Enter Your UserName' name='username' onChange={inputHandler} required />
            <input type="email" placeholder='Enter Your Email here' name='email' onChange={inputHandler} required />
            <input type="password" placeholder='Set Password' name='password' onChange={inputHandler} required />
            <select name="status" className="register-status" onChange={inputHandler} required >
              <option value="" className='register-status-options'>Select Your Online Status</option>
              <option value="🌙 Idle" className='register-status-options'>🌙 Idle</option>
              <option value="⏳ Busy" className='register-status-options'>⏳ Busy</option>
              <option value="🔕 Do Not Disturb" className='register-status-options'>🔕 Do Not Disturb</option>
            </select>
            <input type="text" placeholder='What Should We Call You' name='nickname' onChange={inputHandler} required />
            <div className='avatar-picker-div'>
              <p className='avatar-picker-p'>Choose Your Avatar Here :</p>
              {userAvatar ? <img src={userAvatar} alt="User-Avatar" className='avatar-pic-preview' /> : <p onClick={() => { setAvatarPicState(true) }} className='choose-avatar-p'>Choose Avatar</p>}
            </div>
            <button type='submit'>Sign Up</button>
            <div className="already-registered">
              <p>Already Registered? <a href="/login">Login</a></p>
            </div>
          </form>

        </div>

      </div>
      {avatarDivState && (
        <div className="avatar-picker-box">
          <div className="avatar-picker">
            <i class="fa-solid fa-xmark" onClick={() => setAvatarPicState(false)}></i>
            <div className="avatars-div">


              {avatarPics.map((img, index) => {
                return (
                  // <div key={index} className="avatar-imgs">
                  <img key={index} src={img} alt="Avatar" onClick={() => {
                    setUserAvatar(img);
                    setFormData({ ...formData, avatar: img });
                    setAvatarPicState(false);
                  }} className='avatar-pics' />
                  // </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  ))
}

export default Register