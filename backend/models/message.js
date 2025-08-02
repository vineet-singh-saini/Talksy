const mongoose = require('mongoose');

const MsgSchema = new mongoose.Schema(
    {
   chatId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
   },
   senderId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
   },
   message : {
    type : String,
   }
    },
    {timestamps :true}
);

module.exports = mongoose.model('Message',MsgSchema);