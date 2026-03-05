/*
title: User Handler
Author: Abdul Bari.
Date: 27-02-2026.
Description: User Handler to serve user related data.
*/

// dependecies
const data = require('../../lib/data');
const { hash }  = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

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
    // check primary id is already exists or not
    const phone = typeof(reqProperties.queryStringObject.phone) === 'string' &&  reqProperties.queryStringObject.phone.trim().length === 11 ? reqProperties.queryStringObject.phone : false;
    if(phone){
        // verify token
        const token = typeof(reqProperties.headerObject.token) === 'string' ? reqProperties.headerObject.token : false;
        tokenHandler._token.Verify(token, phone, (tokenId) => {
            if(tokenId){
                // check the user
                data.read('users', phone, (err, u) => {
                    const user = { ...parseJSON(u)};
                    if(!err && user){
                        delete user.password;
                        callback(200, user)
                    }else{
                        callback(404, {error: 'User not found'});
                    }
                });
            }else{
                callback(403, {error: 'User authentication failed'})
            }
        });

    }else{
        callback(404, {error: 'User not found'});
    }
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
                callback(500, {error: 'Server error. User may already exists.'});
            }
        });
    }else{
        callback(400, { error : 'All input fields are required'});
    }
};

handler._users.put = (reqProperties, callback) => {
    const phone = typeof(reqProperties.body.phone) === 'string' &&  reqProperties.body.phone.trim().length === 11 ? reqProperties.body.phone : false;

    const firstName = typeof(reqProperties.body.firstName) === 'string' &&  reqProperties.body.firstName.trim().length > 0 ? reqProperties.body.firstName : false;
    const lastName = typeof(reqProperties.body.lastName) === 'string' &&  reqProperties.body.lastName.trim().length > 0 ? reqProperties.body.lastName : false;
    const password = typeof(reqProperties.body.password) === 'string' &&  reqProperties.body.password.trim().length > 0 ? reqProperties.body.password : false;

    if(phone){
        if(firstName || lastName || password){
            // verify token
            const token = typeof(reqProperties.headerObject.token) === 'string' ? reqProperties.headerObject.token : false;
            tokenHandler._token.Verify(token, phone, (tokenId) => {
                if(tokenId){
                    // lokup user
                    data.read('users', phone, (err, u) => {
                        let userData = { ... parseJSON(u)};
                        if(!err && userData){
                            if(firstName){userData.firstName = firstName;}
                            if(lastName){userData.lastName = lastName;}
                            if(password){userData.password = hash(password);}
                            // update db
                            data.update('users', phone, userData, (err) => {
                                if(!err){
                                    callback(200, {message: 'user successfully updated'});
                                }else{
                                    callback(500, { error : 'Invalid request' });
                                }
                            });

                        }else{
                            callback(400, {error: 'Invalid request'});
                        }
                    });
                }else{
                    callback(403, {error: 'Un authenticated user'});
                }
            });
        }else{
            callback(400, {error: 'Invalid request'});
        }
    }else{
        callback(400, {error: 'Invalid phone number'});
    }
};

handler._users.delete = (reqProperties, callback) => {
    const phone = typeof(reqProperties.queryStringObject.phone) === 'string' && reqProperties.queryStringObject.phone.trim().length == 11 ? reqProperties.queryStringObject.phone : false;
    if(phone){
        // token verify
        const token = typeof(reqProperties.headerObject.token) === 'string' ? reqProperties.headerObject.token : false;
        tokenHandler._token.Verify(token, phone, (tokenId)=>{
            if(tokenId){
                // lookup user
                data.read('users', phone, (err, u) => {
                    if(!err && u){
                        data.delete('users', phone, (delErr) => {
                            if(!delErr){
                                callback(200, {message: 'user successfully deleted'});
                            }else{
                                callback(500, { error: 'Server error'});
                            }
                        });
                    }else{
                        callback(500, {error: 'Invalid request'});
                    }
                });
            }else{
                callback(403, {error: 'Un authenticated user'});
            }
        });
        
    }else{
        callback(400, {error: 'Invalid request'});
    }
};

module.exports = handler;