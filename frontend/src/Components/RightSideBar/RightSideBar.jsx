import React, { useEffect, useState } from 'react'
import './RightSideBar.css'
import socket from '../../socket'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const RightSideBar = ({ selectedUser, setSelectedUser, isProfile, setIsProfile }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  console.log (currentUser);

  return (
     <>
      <div className='user-profile-div'>
        <div className="user-profile">

          <div className="user-profile-header">
            <i class="fa-solid fa-xmark" onClick={() => setIsProfile(false)}></i>
          </div>

          <div className="user-profile-pic-div">
            <img src={currentUser?.avatar || 'https://t4.ftcdn.net/jpg/01/24/65/69/240_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg'} alt="avatar-img" />
            <p>{currentUser.username}</p>
          </div>
          <div className="user-profile-info-div">
            <div className="user-profile-info">
              <i class="fa-solid fa-at"></i>
              <p>{currentUser.username}</p>
            </div>
            <div className="user-profile-info">
              <i class="fa-solid fa-envelope"></i>
              <p>{currentUser.email}</p>
            </div>
            <div className="user-profile-info">
              <i class="fa-solid fa-phone"></i>
              <p>N/A</p>
            </div>
            
            <button onClick={()=> {
              sessionStorage.removeItem(token);
              // sessionStorage.removeItem(user);
              navigate('/');
            }}>Log Out</button>
          </div>
        </div>

      </div>
      </>
    
  )
}

export default RightSideBar