/**
 * Created by hesham on 26/02/17.
 */
var mongoose = require('mongoose');


//student schema

var portfolioSchema = mongoose.Schema({
    title :{
        type: String
    },
    email :{
        type: String
    },
    type :{
        type: String,
        enum :['screenshot', 'link', 'github']
    },
    screenshot   : {
        type: String,
    },
    link   : {
        type: String,
    },
    github   : {
        type: String,
    }
})

var Portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = Portfolio;


