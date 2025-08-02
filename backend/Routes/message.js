const express = require ('express');
const router = express.Router();
const Message = require('../models/message')
const authMiddleware = require('../middleWares/auth')
const mongoose = require('mongoose'); 


router.get ('/:conversationId',authMiddleware, async(req,res)=> {
    try {
        const conversationObjectId = new mongoose.Types.ObjectId(req.params.conversationId);
        const allChats = await Message.find({
            chatId: conversationObjectId,
        });
        res.status(200).json(allChats);
        
    }catch(err){
        
        res.status(500).json({message:err.message})
    }
})

router.post ('/',async (req,res) => {
    const newMessage = new Message(req.body);
    try{
        const savedNewMessage = await newMessage.save();
        res.status(200).json(savedNewMessage);
    }catch(err) {
        res.status(400).json({message: err.message})
    }
})


module.exports = router;