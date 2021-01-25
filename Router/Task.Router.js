const express = require('express');
const taskRouter = express.Router();
const taskController = require('../Controller/Task.Controller');

taskRouter.get('/tasks', (req, res) => {
    console.log('Get Tasks...');
    taskController.getTasksList(req, (result) => {
        res.status(200).send(result);
    });
});

taskRouter.get('/tasks/:id', (req,res) => {
    console.log('Get Task...');
    taskController.getTask(req, (result) => {
        res.status(200).send(result);
    });
});

taskRouter.post('/tasks',(req, res)=>{
    console.log('Create Task...');
    taskController.createTask(req, (result) => {
        res.status(201).send(result);
    });
});

taskRouter.put('/tasks/:id', (req, res) => {
    console.log('Update Task...');
    taskController.updateTask(req, (result) => {
        res.status(200).send(result);
    })
});

taskRouter.delete('/tasks/:id', (req, res) => {
    console.log('Delete Task...');
    taskController.deleteTask(req, (result) => {
        res.status(200).send(result);
    })
})

module.exports = taskRouter;