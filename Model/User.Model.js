const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const saltRounds = 10;


let user = new mongoose.Schema({
    User: {type: String, required: true, unique: true},
    Password: {type: String, required: true}
},{
    collation: 'Users'
});

 user.pre('save', function (next) {

    if(this.isNew || this.isModified('Password')){
        const document = this;
        bcrypt.hash(document.Password, saltRounds, (error, ecrypted) => {
            if(error){
                console.log('Error '+ error); 
                next(error);
            }
            else{
                document.Password = ecrypted;
                next();
            }
        });
    }
    else{
        next();
    }
});

user.methods.isCorrectPassword = function (password, cb) {
    bcrypt.compare(password, this.Password, (error, same)=>{
        if(error) cb(error);
        else cb(error, same);
    });
};

module.exports = mongoose.model('User',user);