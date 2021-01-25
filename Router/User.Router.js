const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/User.Controller');

userRouter.post('/register',(req, res)=>{
    console.log('register user...');
    userController.register(req, (result)=>{
        res.status(201).send(result);
    });
})

userRouter.post('/authenticate', (req,res)=>{
    console.log('login user...');
    userController.login(req, (result) => {
        res.status(res.statusCode).send(result);
    });
});

userRouter.get('/user/:id', (req,res) => {
    console.log('Get user');
    userController.getUser(req, (result) => {
        res.status(res.statusCode).send(result);
    })
})

module.exports = userRouter;