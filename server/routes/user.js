const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.put('/editProfile', (req, res) => {
    const nameUpdated = req.body.name
    const avatarUpdated = req.body.avatar
    const userId = req.body.userId
    console.log("editUser")
    User.findByIdAndUpdate(userId,{ $set:{ avatar: avatarUpdated, name: nameUpdated }})
        .then(updatedProfle => {
            res.json({ msg: "Your info is successfully updated", updatedProfle: updatedProfle })
        })
        .catch(err => console.log(err))
})



router.get('/:userId', (req, res) => {
    
    const userId=req.params.userId
    
    User.find({_id:userId})
    .populate('following')
    .populate('followers')
        .then(user => {
            
            res.json({ msg:'retrive user' , user:user[0] })
        }).catch(err => res.json({ msg: err }))
})

router.get('/search/:username', (req, res) => {
    
    const username=req.params.username
    var searchKey = new RegExp(username, 'i')
    User.find({name:searchKey})
    .populate('following')
    .populate('followers')
        .then(users => {
            res.json({ msg:'retrive all useres with that name' , users:users })
        }).catch(err => res.json({ msg: err }))
})

// register new user
router.post("/register", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        avatar: req.body.avatar,
    };
    newUser.email = newUser.email.toLowerCase();
    User.findOne({ email: newUser.email })
        .populate('following')
        .populate('followers')
        .then((user) => {
        
            // if the email in the database !
            if (user) {
                res.json({
                    msg: "This email already used! ",
                });
            }
            // if the email is not insaid the database
            else {
                var salt = bcrypt.genSaltSync(10);
                newUser.password = bcrypt.hashSync(req.body.password, salt);
                newUser.email = newUser.email.toLowerCase();
                User.create(newUser).then((user) => {
                    res.json({ msg: "successfully registered", user: user });
                });
            }
        })
        .catch((err) => res.json({ msg: err }));
});

// login user
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    //  let email = req.body.email ; let password = req.body.password
    email = email.toLowerCase();
    const user = await User.findOne({ email: email })
    .populate('following')
    .populate('followers'); // its same to =>  User.findOne({email:email}).then(user => { })
    // if email is  not exist
    if (!user) {
        res.json({ msg: "email or password is not correct" });
    }
    // if email is  exist
    else {
        // if password is currect
        if (bcrypt.compareSync(password, user.password)) {
            user.password = undefined;
            let payload = { user };
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1000 * 60 * 90,
            }); // to the user info
            res.json({ msg: "successfully logged in ", token });
        }
        // / if password is not currect
        else {
            res.json({ msg: "email or password is not correct" });
        }
    }
});

//follow other user
router.post('/follow/:userId/:idToFollow', (req, res) => {
    const userId = req.params.userId;
    const idToFollow = req.params.idToFollow;

    User.findByIdAndUpdate(userId, { $addToSet: { following: idToFollow } })
    .populate('following')
    .populate('followers')
    .then(user => {
        User.findByIdAndUpdate(idToFollow, { $addToSet: { followers: userId } }).then(user => {

        }).catch(err => console.log(err))
        console.log("follow ",user)
        res.json({ msg: "successfully followed", user: user });

    }).catch(err => console.log(err))
})

//unfollow other user
router.post('/unfollow/:userId/:idToUnfollow', (req, res) => {
    const userId = req.params.userId;
    const idToUnfollow = req.params.idToUnfollow;

    User.findByIdAndUpdate(userId, { $pull: { following: idToUnfollow } })
    .populate('following')
    .populate('followers')
    .then(user => {
            User.findByIdAndUpdate(idToUnfollow, { $pull: { followers: userId } })
                .then(user => {

                }).catch(err => console.log(err))
                
            res.json({ msg: "successfully unfollowed", user: user });

        }).catch(err => console.log(err))
})

module.exports = router