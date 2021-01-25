const mongoose = require('mongoose');
const taskModel = require('../Model/Task.Model');

exports.getTasksList = (req, callback) => {
    taskModel.find({}).exec( (error, response) => {
        if(error) callback(error);
        callback(response);
    });
};

exports.getTask = (req, callback) => {
    taskModel.findById(req.params.id).exec( (error, response) =>{
        if(error) callback(error);
        callback(response);
    });
};

exports.createTask = (req, callback) => {
    let request = {};
    request.Description = req.body.Description;
    request.Date = req.body.Date;
    request.Status = req.body.Status;

    newObject = new taskModel(request);

    newObject.save().then( response => {
        callback(response);
    }).catch( error => {
        callback(error);
    });
};

exports.updateTask = (req, callback) => {
    taskModel.findById(req.params.id).exec((error, objectFind) => {
        if(error) callback(error);
        objectFind.Description = req.body.Description;
        objectFind.Date = req.body.Date;
        objectFind.Status = req.body.Status;

        objectFind.save().then( result => {
            callback(result);
        }).catch( error => callback(error));
    })
};

exports.deleteTask = (req, callback) => {
    taskModel.findByIdAndRemove(req.params.id, {useFindAndModify: false}).exec( (error, result) => {
        if(error) callback(error);
        callback (result);
    })
};
