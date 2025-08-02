import React, { useState, useEffect, useRef } from 'react'
import './Chat.css'
import EmojiPicker from 'emoji-picker-react'
import socket from '../../socket'
import axios from 'axios'
import { io } from 'socket.io-client'


const Chat = ({ selectedUser, setSelectedUser }) => {

  const [chatMessages, setChatMessages] = useState('');
  const [allMessageData, setAllMessageData] = useState([]);
  const [newMessageData, setNewMessageData] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  const [chatId, setChatId] = useState();
  const messagesEndRef = useRef(null);
  const currentUserId = currentUser.id;

  useEffect(() => {

    const getAllChats = async () => {

      if (!selectedUser) return;
      
      const token = sessionStorage.getItem('token');
      try {
        const res = await axios.post('https://talksy-backend-9kxy.onrender.com/allconvos/get-chat-id', {
          senderId: currentUserId,
          receiverId: selectedUser._id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.data || res.data.length === 0) {
          setAllMessageData([]);
          setChatId(null);
          return;
        }
        setChatId(res.data[0]._id);
        const chatsId = res.data[0]._id;
        console.log(res.data[0]._id);



        const allChats = await axios.get(`https://talksy-backend-9kxy.onrender.com/all-convo-msg/${chatsId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log ('yha tk chlgya');
        console.log(allChats.data);
        setAllMessageData(allChats.data);
      } catch (err) {
        console.log(err);
      };
    }
    getAllChats();
  }, [selectedUser])


  useEffect(() => {
    if (chatId) {
      socket.emit('join_chat', chatId);
    }
  }, [chatId]);


  const sendNewMessage = async () => {

    // posting new msg to backend setup
    const token = sessionStorage.getItem('token');
    const msgData = {
      chatId: chatId,
      senderId: currentUserId,
      message: newMessageData,
    }

    // const sendMsg = await axios.post(`https://talksy-backend-9kxy.onrender.com/all-convo-msg/`,msgData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    socket.emit('send_message', msgData);
    // setAllMessageData(prev => [...prev, sendMsg.data]);
    setNewMessageData('');

  }

  useEffect(() => {
    if (!socket) return;
    socket.on('receive_message', (msg) => {
      setAllMessageData(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessageData]);


  const onEmojiClick = (emojiData) => {
    setNewMessageData(prev => prev + emojiData.emoji);
  };



  return (
    <>
      {
        selectedUser ? (
          <div className='chat-div' >
            <div className="chat">

              <div className="chat-header">
                <div className="chat-header-left">
                  <img src={selectedUser?.avatar || 'https://t4.ftcdn.net/jpg/01/24/65/69/240_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg'}   alt="avatar" />
                  <div className="chat-header-left-name">
                    <p className='chat-header-left-username'>{selectedUser.username}</p>
                    <p className={selectedUser.status === '🌙 Idle' ? 'chat-selected-user-status green' : 'chat-selected-user-status grey'}>{selectedUser.status}</p>
                  </div>

                </div>
                <div className="chat-header-right">
                  <span><i class="fa-solid fa-phone"></i></span>
                  <span><i class="fa-solid fa-video"></i></span>
                  <span><i class="fa-solid fa-info"></i></span>
                </div>
              </div>

              <hr className='chat-header-bottom-line' />

              <div className="chat-chatbox">
                {Array.isArray(allMessageData) && allMessageData.length > 0 ? (
                  allMessageData.map((msg, index) => (
                    <div
                      key={index}
                      className={msg.senderId === currentUser.id ? 'chat-msg-2' : 'chat-msg-1'}
                    >
                      <p>{msg.message}</p>

                    </div>

                  ))
                ) : (
                  <p className='no-messages'>No messages yet.</p>
                )}
                <div ref={messagesEndRef} />
              </div>

              <hr className='chat-chatbox-hrline' />

              <div className="chat-send-div">
                <div className="chat-send">
                  <input type="text" placeholder='Type here..' onChange={(e) => setNewMessageData(e.target.value)} value={newMessageData} />
                  <span className='chat-send-emoji' >
                    {showEmojiPicker === false && (
                      <i class="fa-regular fa-face-smile" onClick= {() => setShowEmojiPicker(true)} ></i>
                    )}
                    {showEmojiPicker && (
                      <i class="fa-solid fa-xmark" onClick={() => setShowEmojiPicker(false)}></i>
                    )}

                    {showEmojiPicker && (
                      <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={onEmojiClick} theme='dark'   />
                      </div>
                    )}

                  </span>

                  <span className='chat-send-msg-send' onClick={() => sendNewMessage()}><i class="fa-solid fa-paper-plane"></i></span>
                </div>
              </div>
            </div>
          </div>
        ) :
          <div>
            <p>No user selected</p>
          </div>
      }

    </>
  )
}

export default Chat