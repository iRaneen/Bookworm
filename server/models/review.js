const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({

    bookId: {
        type: String, 
    },
    bookName:{
        type:String,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'  
    },
    comment: {
        type: String, 
    },

    // rating: {
    //     type: String,   
    // }, 
});

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review;
