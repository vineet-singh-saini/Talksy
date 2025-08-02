import { io } from 'socket.io-client'

const socket = io('https://talksy-backend-9kxy.onrender.com', {
  auth: {
    token: sessionStorage.getItem('token')
  }
});

export default socket;