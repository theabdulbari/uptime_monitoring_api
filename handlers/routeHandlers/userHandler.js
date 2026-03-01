/*
title: User Handler
Author: Abdul Bari.
Date: 27-02-2026.
Description: User Handler to serve user related data.
*/

// dependecies
const data = require('../../lib/data');
const { hash }  = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (reqProperties, res) => {
    // check method
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf(reqProperties.method) > -1){
        handler._users[reqProperties.method](reqProperties, res);
    }else{
        res(405);
    }
};

handler._users = {};

handler._users.get = (reqProperties, callback) => {
    callback(200);
};

handler._users.post = (reqProperties, callback) => {

    const firstName = typeof(reqProperties.body.firstName) === 'string' &&  reqProperties.body.firstName.trim().length > 0 ? reqProperties.body.firstName : false;
    const lastName = typeof(reqProperties.body.lastName) === 'string' &&  reqProperties.body.lastName.trim().length > 0 ? reqProperties.body.lastName : false;
    const phone = typeof(reqProperties.body.phone) === 'string' &&  reqProperties.body.phone.trim().length === 11 ? reqProperties.body.phone : false;
    const password = typeof(reqProperties.body.password) === 'string' &&  reqProperties.body.password.trim().length > 0 ? reqProperties.body.password : false;
    const termsConf = typeof(reqProperties.body.termsConf) === 'boolean' &&  reqProperties.body.termsConf ? reqProperties.body.termsConf : false;
    
    if(firstName && lastName && phone && password && termsConf)
    {
        // check the user exists or not
        data.read('users', phone, (err, user) => {
            if(err){
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    termsConf,
                };

                // store user data to database
                data.create('users', phone, userObject, (userCreateErr) => {
                    if(!userCreateErr)
                    {
                        callback(200, {message: 'user created successfully'});
                    }else{
                        callback(500, {error: 'unabale to create error'});
                    }
                });
            }else{
                callback(500, {error: 'Server error'});
            }
        });
    }else{
        callback(400, { error : 'All input fields are required'});
    }
};

handler._users.put = (reqProperties, callback) => {
    
};

handler._users.delete = (reqProperties, callback) => {
    
};

module.exports = handler;