import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import Chat from '../../Components/Chat/Chat'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'
import { isAuth } from '../../utils/checkAuth'


const Home = () => {
  const navigate = useNavigate();

  const [selectedUser , setSelectedUser] = useState(false);
  const [isProfile , setIsProfile] = useState(false);
  const [chatBack , setChatBack] = useState(false);


  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
    }
  }, []);

  ;

  return (
    <>
    <div className="chat-app-div">

      <div className="chat-app">
        
        <div className= { selectedUser  ? 'chat-app-left' : 'chat-app-left2'} >
          <LeftSideBar selectedUser = {selectedUser}  setSelectedUser = {setSelectedUser} isProfile = {isProfile}  setIsProfile={setIsProfile} />
        </div>
        <div className={ selectedUser && chatBack === false ? 'chat-app-chat' : 'chat-app-chat2'}>
          <Chat selectedUser = {selectedUser}  setSelectedUser = {setSelectedUser}   />
        </div>
        <div className={ isProfile ? 'chat-app-right' : 'chat-app-right hide'}>
          <RightSideBar selectedUser = {selectedUser}  setSelectedUser = {setSelectedUser}  isProfile = {isProfile}  setIsProfile={setIsProfile}  />
        </div>
        
       </div>
    </div>
    </>
  )
}

export default Home