const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username : {
        type : String,
        // required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        
    },
    status : {
        type : String,
        default : '🌙 Idle',
        required : true
    },
    nickname : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true,
        default : 'https://t4.ftcdn.net/jpg/01/24/65/69/240_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg'
    }

},
{
    timestamps : true
}
);

module.exports = mongoose.model('User', UserSchema);