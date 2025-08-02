const express = require ('express');
const app = express();

const mongoose = require('mongoose');
const http = require ('http');
const cors = require ('cors');
const {Server} = require ('socket.io');
require('dotenv').config();
const port = process.env.PORT;
const Message = require('./models/message')
const authRoutes = require('./Routes/auth');
const allUsers =  require('./Routes/alllUsers');
const Conversations = require ('./Routes/Conversation');
const ConvoMessages = require ('./Routes/message');
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: 'http://localhost:5173',
        methods : ['GET', 'POST']
    },
});

io.on('connection',(socket) => {
    console.log ('user Connected', socket.id);

    socket.on('join_chat',(chatId) => {
        console.log('user joined chat', chatId);
        socket.join(chatId);
    });

    socket.on('send_message', async(data)=> {
        const newMessage = new Message(data);
        const saved = await newMessage.save();
        io.to(data.chatId).emit('receive_message',saved);
    });  

    socket.on('disconnect', ()=>{
        console.log('user disconnected', socket.id);
    })

})

app.use ('/auth',authRoutes);
app.use ('/allconvos',Conversations);
app.use ('/all-convo-msg',ConvoMessages);
app.use ('/allusers',allUsers);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get ('/',(req,res)=> {
    res.send ('Welcome to Talksy-BACKEND');
})

server.listen(port , (req,res) => {
    console.log(`server is running on port ${port}`);
});