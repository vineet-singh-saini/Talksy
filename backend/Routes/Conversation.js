const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');
const authMiddleware = require('../middleWares/auth')

router.get('/conversations/:userId', async (req, res) => {
    const conversation = await Conversation.find({
        participants: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
});

router.post('/get-chat-id', async (req, res) => {
    try {
        
        const chatId = await Conversation.find({
            participants: { $all: [req.body.senderId, req.body.receiverId] }
        });
        res.status(200).json(chatId);
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/conversations', authMiddleware, async (req, res) => {
    const newConvo = new Conversation({
        participants: [req.body.senderId, req.body.receiverId],
    });
    const convo = await Conversation.findOne({
        participants: { $all: [req.body.senderId, req.body.receiverId] }
    });
    if (!convo) {
        try {
            const savedConvo = await newConvo.save();
            res.json(savedConvo);
        } catch (err) {
            console.error('Failed Saving Chat IDs', err);
        }
    }
});

module.exports = router;