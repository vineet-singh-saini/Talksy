const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {

    try {
        const { username, email, password, status, nickname, avatar } = req.body;
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        } else {
            hashPass = await bcrypt.hash(password, 10)
            const user = new User({
                username,
                email,
                password: hashPass,
                status,
                nickname,
                avatar,
            });

            try {
                const savedUser = await user.save();
                console.log(savedUser);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Error creating user' });
            }


            const token = jwt.sign({
                id: user._id
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );
            res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, status: user.status, nickname: user.nickname, avatar: user.avatar } });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Error registering user', err: err.message });

    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password, nickname, avatar } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User Not Found' });
        } else {
            const matchPswd = await bcrypt.compare(password, user.password);
            if (!matchPswd) {
                return res.status(400).json({ msg: 'Invalid Credentials !! ' });
            }
            const token = jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
            res.json({ token, user: { id: user._id, username: user.username, email: user.email, nickname: user.nickname, avatar: user.avatar } });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Error logging in user' });
    };
}