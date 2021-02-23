const express = require('express');
const router = express.Router();
const Recommendations = require('../models/recommendations');
const User = require('../models/user');
require('dotenv').config();

router.post("/recommendations/:bookId", (req, res) => {

    const newRecommendations = {
        bookId: req.params.bookId,
    };

    Recommendations.create(newRecommendations)
        .then(recommendation => {
            Recommendations.find()
                .then(recommendations => {
                    res.json({ msg: "Your review is successfully added", recommendations: recommendations })
                })

        })
        .catch(err => console.log(err))
})

router.get("/recommendations", (req, res) => {

    Recommendations.find()
        .then(recommendations => {
            res.json({ msg: "Your review is successfully added", recommendations: recommendations })
        })
        .catch(err => console.log(err))
})

router.delete("/recommendations/:bookId", (req, res) => {
    const bookId= req.params.bookId;
    Recommendations.findByIdAndDelete(bookId)
        .then(()=> {
            res.json({ msg: "Your recommendations is successfully deleted"})
        })
        .catch(err => console.log(err))
})



//to read add
router.post('/addToRead/:userId/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    User.findByIdAndUpdate(userId, { $addToSet: { wants_to_read: bookId } })
        .populate('following')
        .populate('followers')
        .then(user => {

            res.json({ msg: "successfully to read", user: user });

        }).catch(err => console.log(err))
})

//to read remove
router.post('/removeToRead/:userId/:bookId', (req, res) => {

    const userId = req.params.userId;
    const bookId = req.params.bookId;

    User.findByIdAndUpdate(userId, { $pull: { wants_to_read: bookId } })
        .populate('following')
        .populate('followers')
        .then(user => {

            res.json({ msg: "successfully remove to read", user: user });

        }).catch(err => console.log(err))
})

//reads add 
router.post('/addReads/:userId/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    User.findByIdAndUpdate(userId, { $addToSet: { reads: bookId } })
        .populate('following')
        .populate('followers')
        .then(user => {

            res.json({ msg: "successfully Read", user: user });

        }).catch(err => console.log(err))

})

//reads remove
router.post('/removeReads/:userId/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    User.findByIdAndUpdate(userId, { $pull: { reads: bookId } })
        .populate('following')
        .populate('followers')
        .then(user => {

            res.json({ msg: "successfully remove read", user: user });

        }).catch(err => console.log(err))
})

module.exports = router