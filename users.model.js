
const mongoose = require('mongoose');
const Joi = require('joi');
const { User, Question } = require('./models');

const LoginSchema = Joi.object({
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required()
}).required();

const RegisterSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
}).required();

async function Login(user) {
    //check validation for username or password
    // username string, maximum number 50, min number 5, regex email
    // passWord string min 6 max 50
    let message = "";

    const { error, value } = LoginSchema.validate(user);
    if (error) {
        message = error;
        return error;
    }
    //search in database about this username
    let userExist = await User.findOne({ email: user.username }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            return doc;
        }
    });

    if (!userExist || userExist.password !== user.password) {
        message = "Invalid username or password";
        return message;
    }
    message = "Ok";
    return message; 
}

async function Register(user) {

    let message = "";

    const { error, value } = RegisterSchema.validate(user);

    if (error) {
        message = error;
        return error;
    }

    // search for user existence with email user.email
    // if user found resend error message that user already exists
    // email is unique to our system it can't be doublicated 
    let userExist = await User.findOne({ email: user.email }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            return doc
        }
    });
    
    if (userExist) {
        message = "user already Exists";
        return { message };
    }

    //add user to database 
    let newUser = new User(user);

    let dbError = await newUser.save(function (err) {
        if (err) return handelError(erro);
    });

    if (dbError) {
        return { message: "something wrong happend with database", dbError };
    }

    message = "user created";
    return { message };
}

async function GetAllQuestions(){
    return await Question.find();
}
module.exports = {
    Login,
    Register, 
    GetAllQuestions
}