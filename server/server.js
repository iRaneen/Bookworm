const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000
const dotenv = require('dotenv').config();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(
    process.env.mongodb,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(`Connected to MongoDB`)
);


// Routes
app.use('/api/user',require('./routes/user'));
app.use('/api/book',require('./routes/book'));
app.use('/api/review',require('./routes/review'));


app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));

const path = require('path')
app.use(express.static(path.join(__dirname , "build")));
app.get("*" , (req,res ) =>{
res.sendFile(path.join(__dirname , "build" , "index.html"))
})
