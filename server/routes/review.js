const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.get("/", (req, res) => {
    const id = req.params.userId
    Review.find()
        .populate('reviewerId')
        .then(reviews => {
            res.json({ msg: "Your reviews are successfully retrieved", reviews: reviews })
        })
})

router.get("/user/:userId", (req, res) => {
    const id = req.params.userId
    Review.find({ reviewerId: id })
        .populate('reviewerId')
        .populate('reviewerId.following')
        .populate('reviewerId.followers')
        .then(reviews => {
            res.json({ msg: "Your reviews are successfully retrieved", reviews: reviews })
        })
})

router.get("/book/:bookId", (req, res) => {

    const id = req.params.bookId
    Review.find({ bookId: id })
        .populate('reviewerId')
        .populate('reviewerId.following')
        .populate('reviewerId.followers')
        .then(reviews => {
            res.json({ msg: "Your reviews are successfully retrieved", reviews: reviews })
        })
        .catch(err => console.log(err))
})

router.post("/:bookId/:userId", (req, res) => {
    
    const newReview = {
        bookId: req.params.bookId,
        reviewerId: req.params.userId,
        comment: req.body.comment,
        // rating: req.body.rating,
    };

    Review.create(newReview)
        .then(review => {
            Review.find({ _id: review._id })
                .populate('reviewerId')
                .populate('reviewerId.following')
                .populate('reviewerId.followers')
                .then(review => {
                    res.json({ msg: "Your review is successfully added", review: review[0] })

                })

        })
        .catch(err => console.log(err))
})

router.delete('/removeReview/:reviewId', (req, res) => {
    
    let reviewId = req.params.reviewId

    Review.findByIdAndDelete(reviewId)
        .then(() => {
            res.json({ msg: "Your review is successfully deleted"})
        })
        .catch(err => console.log(err))

})

router.put('/updateReview/:reviewId', (req, res) => {

    let reviewId = req.params.reviewId
    let updateReview = req.body.updateReview
    Review.findByIdAndUpdate(reviewId, updateReview)
        .then((review) => {
            res.json({ msg: "Your review is successfully updated", review: review })
        })
        .catch(err => console.log(err))
})


module.exports = router