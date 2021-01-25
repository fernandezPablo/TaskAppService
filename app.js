const express = require('express');
const bodyparser = require('body-parser');
const methodoverride = require('method-override');
const config = require('./config.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(methodoverride());

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true}).then( result => {
    console.log('Connected to mongoDB...');
}).catch( error => {
    console.log('Error: '+ error);
})

app.listen( 3000, () => {
    console.log('Listen on port 3000 ...');
});

const taskRouter = require('./Router/Task.Router');
const userRouter = require('./Router/User.Router');

app.use(cors());

app.use('/api/',userRouter);


app.use( function (req, res, next){
    const token = req.headers['authorization'];
    console.log('verifying token: '+ token);
    if(token){
        console.log('token exists...');
        jwt.verify(token,config.masterKey, (error,decoded) => {
            if(error){
                console.log('token not verified: '+ error);
                res.status(401).send({message: 'Invalid Token...'});
            }
            else{
                console.log('Token verified...');
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(401).send({
            message: 'Token not provided...'
        })
    }
});


app.use('/api/',taskRouter);
