const mongoose = require('mongoose');
const recommendationsSchema = new mongoose.Schema({

    bookId:{type:String},
    
});

const Recommendations = mongoose.model('Recommendations', recommendationsSchema)
module.exports = Recommendations;

  