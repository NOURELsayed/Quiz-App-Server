var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/Users';

const connectToDatabase = () => { mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }); }

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String, 
    password: String,
});

var QuestionSchema = new Schema({
    _id: Number,
    question: String,
    answers: [{
        type: String
    }],
    rightAnswer: Number
});

var User = mongoose.model('User', UserSchema);

var Question = mongoose.model('Question', QuestionSchema);

module.exports = {
    User,
    Question,
    connectToDatabase
}