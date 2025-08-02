import React from 'react'
import './LeftSideBar.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const LeftSideBar = ({ selectedUser, setSelectedUser ,isProfile , setIsProfile }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentUser.id;
  console.log (currentUser.id)
  const [recentChats, setRecentChats] = useState([]);
  const [allContactsList, setAllContactsList] = useState(false)
  const [newAllContacts, setNewAllContacts] = useState([]);
  const [receiverId, setReceiverId] = useState(selectedUser._id);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    navigate('/login');
  };

  const sendConvoIds = async (user) => {
    setSelectedUser(user);
    setReceiverId(user._id);
    console.log('convo func is triggered');
    const convoData = {
      senderId: currentUser.id,
      receiverId: user?._id
    };

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('https://talksy-backend-9kxy.onrender.com/allconvos/conversations', convoData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const convoRoomIds = response.data;
      console.log(convoRoomIds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const fetchRecentChats = async () => {
    const token = localStorage.getItem('token');
    // console.log (userId);
    try {
      const convoRes = await axios.get(`https://talksy-backend-9kxy.onrender.com/allconvos/conversations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const conversationList = convoRes.data;

      const usersData = await Promise.all(
        conversationList.map(async (convo) => {
          // find the other participant
          const receiverId = convo.participants.find(id => id !== userId);
          console.log (receiverId);
          // fetch that user's details
          const userRes = await axios.get(`https://talksy-backend-9kxy.onrender.com/allusers/receiver/${receiverId}`);
          console.log(userRes);
          return userRes.data;
          
        })
      );
      // console.log (receiverId)  ;
      setRecentChats(usersData);
    } catch (err) {
      console.error("Error fetching recent chats", err);
    }
  };

  fetchRecentChats();
}, [userId]);


  useEffect(() => {
    const allContacts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://talksy-backend-9kxy.onrender.com/allusers/allcontacts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNewAllContacts(res.data);
      } catch (err) {
        console.error('Error fetching chats:', err.response?.data?.msg || err.message);
      }
    };

    allContacts();
  }, []);

  return (
    <div className='left-outer-div'>
      <div className="left-inner-div">

        <div className="left-top-block">
          <p className='left-top-block-logo-text'>TALKSY</p>
          {/* <img src="" alt="Talksy Logo" className='left-top-block-logo' /> */}
          <div className="left-top-menu-container">
            <span><i class="fa-solid fa-ellipsis-vertical"></i></span>
            <div className="left-top-menu-container-menu-list">
              <p className='menu-list-txt1' onClick={() => setIsProfile(true)}>Profile</p>
              <hr className='menu-list-hrline' />
              <p className='menu-list-txt2' onClick={() => handleLogout()}>Log Out</p>
            </div>
          </div>
        </div>

        <div className="serch-box-div">
          <div className="searchbox">
            <input type="text" placeholder='Search People...' className="searchbox-input" />
          </div>
          <div className="src-all-contacts">
            <i class="fa-solid fa-plus" onClick={() => setAllContactsList(true)}></i>
          </div>
        </div>

        <div className="left-user-div">
          <div className="left-chat">
            {
              allContactsList === false ? (
                recentChats && recentChats.length > 0 ? (
                  recentChats.map((user, index) => (
                    <div key={index} className="left-chat-user" onClick={() => sendConvoIds(user)}>
                      <div className="left-chat-user-avatar">
                        <img src={user.avatar} alt="User Avatar" className="left-chat-user-avatar-img" />
                      </div>
                      <div className="left-chat-user-info">
                        <div className="left-chat-user-names">
                           <p className="left-chat-user-name">{user.username}</p>
                           <p className="left-chat-user-nickname">{user.nickname}</p>
                        </div>
                        
                        <p className={user.status === '🌙 Idle' ? 'left-chat-user-status green' : 'left-chat-user-status grey'}>
                          {user.status}
                        </p>
                       
                      </div>
                      {/* <div className="left-chat-user-unread">
                        <p className={user.unread > 0 ? "left-chat-user-unread-count" : 'hide'}>
                          {user.unread}
                        </p>
                      </div> */}
                      
                    </div>
                    
                  ))
                ) : (
                  <p>No recent chats</p>
                )
              ) : (
                <div className='all-contacts-div'>
                  <div className="all-contacts-list">
                    <div className="all-contact-list-back">
                      <span onClick={() => setAllContactsList(false)}><i class="fa-solid fa-arrow-left"></i><p>Back To Recent Chats</p></span>
                    </div>
                    {newAllContacts.map((user, index) => (

                      <div key={index} className="all-contacts-list-user" onClick={() => sendConvoIds(user)}>
                        <div className="all-contacts-user-img-div">
                          <img src={user.avatar} alt="avatar" />

                        </div>
                        <div className="all-contacts-list-user-name">
                          <p className="all-contacts-list-name">{user.username}</p>
                          <p className="all-contacts-list-click-chat">Click To Chat..</p>
                        </div>
                      </div>

                    ))}
                  </div>
                </div>
              )
            }


          </div>
        </div>

      </div>

    </div>

  )
}

export default LeftSideBar