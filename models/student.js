/**
 * Created by hesham on 26/02/17.
 */
var mongoose = require('mongoose');


//student schema

var studentSchema = mongoose.Schema({
    name :{
        type: String
    },
    username :{
        type: String,
        unique : true
    },
    email :{
        type: String,
        unique : true
    },
    id :{
        type: String
    },
    github :{
        type: String
    },
    major :{
        type: String, enum: ['met', 'bi']
    },
    password :{
        type: String
    },
    avatar   : {
        type: String,
        default : 'images/default.jpg'
    }
})

var Student = mongoose.model("student", studentSchema);

module.exports = Student;


