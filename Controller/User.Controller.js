const mongoose = require('mongoose');
const User = require('../Model/User.Model');
const config = require('../config');
const jwt = require('jsonwebtoken');

exports.register = (req, callback) => {
    let request = {};

    request.User = req.body.User;
    request.Password = req.body.Password;

    newUser = new User(request);

    newUser.save().then((response) => {
        callback(response);
    }).catch((error) => {
        callback(error);
    });
};

exports.login = (req, callback) => {
    let request = {};

    //se hace el parseo de los datos del body y se los agrega al objeto request
    request.User = req.body.User;
    request.Password = req.body.Password;
    console.log('On login method...');  

    //se usa la funcion findOne de mongoose para encontrar el usaurio que fue ingresado en la solicitud
    User.findOne({User: request.User}).exec( (error, user) => {
        if(error) {
            // si ocurre un error durante la busqueda del usuario se devuelve un JSON con la propiedad
            // success en false para indicar que no se pudo completar la operacion y se indica un mensaje de
            // error
            callback({
                success: false,
                message: error.message
            });
        }
        else if(!user){
            // Si el parametro user no esta asignado significa que no se pudo encontrar el usuario, por lo tanto
            // se devuelve al callback un objeto JSON con la propiedad success seteada en false y el mensaje indicando
            // que el usuario no existe
            callback({
                success: false,
                message: 'The user doesn\'t exist'
            });
        }
        else{
            // se usa el metodo isCorrectPassWord del modelo User para determinar si el password proporcioando es el correcto
            user.isCorrectPassword(request.Password, (error, response)=>{
                if(error){
                    //se verifica si existe algun error se devuelve un objeto JSON con la propiedad success seteada como false
                    // y el mensaje de error que arrojo el metodo
                    callback({
                        success: false,
                        message: error.message
                    });
                }
                else if(response){
                    //si el parametro response fue asignado quiere decir que el password proporcionado es el correcto
                    //por lo tanto se procede generar el token de autenticacion a traves de la libreria JWT
                    const payload = {
                        check: true
                    };
                    const token = jwt.sign(payload,config.masterKey,{expiresIn: 1440});
                    console.log(token);
                    console.log(JSON.stringify(user));
                    //finalmente se devuelve al callack un objeto JSON con la porpiedad success seteada a true, el mensaje
                    //de autentificacion exitosa, el token generado por JWT y el objeto de usuario con su id y userName
                    callback({
                            success: true,
                            message: 'User authenticate succesfully!',
                            token: token,
                            user: {id: user._id, name: user.User}
                        });
                    }
                else{
                    //si no se encuentra asignado el parametro response quiere decir que el password proporcionado no es el 
                    //correcto, por lo tanto se devuelve un objeto JSON con la propiedad success en false y mensaje indicando
                    //que el password no es correcto
                    callback({
                        success: false,
                        message: 'Password incorrect!'
                    });
                }
            });
        }
        
    });
}

exports.getUser = (req, callback) => {
    User.findById(req.params.id).exec((error, response) => {
        if(error) callback(error);
        let userWithoutPass = {_id: response._id, User: response.User}
        callback(userWithoutPass);
    })
}