const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true 
    },
    reads: [{type:String}],
    wants_to_read:[{type:String}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    userType:{
        type: String,
        default:"user"
    },

    

});


const User = mongoose.model('User', UserSchema)
module.exports = User;