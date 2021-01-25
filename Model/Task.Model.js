const mongoose = require('mongoose');

let task = new mongoose.Schema({
    Description: {type: String},
    Date: {type: Date},
    Status: {type: Boolean}
},{
    collation: 'Tasks'
});

module.exports = mongoose.model('Task',task);