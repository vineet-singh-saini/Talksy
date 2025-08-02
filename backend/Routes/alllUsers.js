const express = require ('express');
const router = express.Router();
const User = require('../models/user')

router.get ('/allcontacts' , async (req,res) => {
    try {const allusers = await User.find();
    res.json(allusers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get ('/receiver/:userId' , async (req,res) => {
    try {
        const userId = req.params.userId;
    const receiver = await User.findOne({ _id : userId});
    res.json(receiver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;