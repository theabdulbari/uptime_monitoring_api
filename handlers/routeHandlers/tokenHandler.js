/*
title: Token Handler
Author: Abdul Bari.
Date: 03-03-2026.
Description: Token Handler to serve token related data.
*/

// dependecies
const data = require('../../lib/data');
const { hash }  = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const { randString } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.tokenHandler = (reqProperties, res) => {
    // check method
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf(reqProperties.method) > -1){
        handler._token[reqProperties.method](reqProperties, res);
    }else{
        res(405);
    }
};

handler._token = {};

handler._token.get = (reqProperties, callback) => {
    // check token valid or not
    const tokenId = typeof(reqProperties.queryStringObject.id) == 'string' && reqProperties.queryStringObject.id.trim().length === 20 ? reqProperties.queryStringObject.id : false;
    if(tokenId)
    {

        // check token
        data.read('tokens', tokenId, (tokenReadErr, t) => {
            let token = { ... parseJSON(t)};
            if(!tokenReadErr && token){
                callback(200, token);
            }else{
                callback(404, {error : 'Token not found'});
            }
        });
    }else{
        callback(404, {error: 'Token not found'});
    }
    
};

handler._token.post = (reqProperties, callback) => {
    const phone = typeof(reqProperties.body.phone) === 'string' && reqProperties.body.phone.trim().length === 11 ? reqProperties.body.phone : false;
    const password = typeof(reqProperties.body.password) === 'string' && reqProperties.body.phone.trim().length > 0 ? reqProperties.body.password : false;

    if(phone && password){
        data.read('users', phone, (userError, u) => {
            const userData = { ... parseJSON(u)}; 
            let hashedPassword = hash(password);
            if(hashedPassword === userData.password){
                let tokenId = randString(20);
                let expires = Date.now() + 60 * 60 * 1000;
                let tokenObject = {
                    phone,
                    'id' : tokenId,
                    expires
                };

                // store token
                data.create('tokens', tokenId, tokenObject, (tokenCreateErr) => {
                    if(!tokenCreateErr){
                        callback(200, tokenObject);
                    }else{
                        callback(500, {error: 'Invalid request'});
                    }
                });
            }else{
                callback(400, {error: 'Invalid user'});
            }
        });
    }else{
        callback(400, {error: 'Invalid request'});
    }

};

// refresh token
handler._token.put = (reqProperties, callback) => {

    const id = typeof(reqProperties.body.id) === 'string' && reqProperties.body.id.trim().length === 20 ? reqProperties.body.id : false;
    const extend = typeof(reqProperties.body.extend) === 'boolean' && reqProperties.body.extend === true ? true : false;
    if(id && extend){
        data.read('tokens', id, (tokenGetError, t) => {
            let token  = parseJSON(t);

            if(!tokenGetError && token && token.expires > Date.now()){
                token.expires = Date.now() + 60 * 60 * 1000;

                // update token
                data.update('tokens', id, token, (updateError) => {
                    if(!updateError){
                        callback(200, {message: 'token updated'});
                    }else{
                        callback(500, {error: 'Invalid request'});
                    }
                });
            }else{
                callback(400, {error: 'Token already expiresd'});
            }

        });
    }else{
        callback(500, {error: 'Invalid request'});
    }
};

handler._token.delete = (reqProperties, callback) => {
    const id = typeof(reqProperties.queryStringObject.id) === 'string' && reqProperties.queryStringObject.id.trim().length === 20 ? reqProperties.queryStringObject.id : false;
    if(id){

        data.read('tokens', id, (tokenReadErr, token)=> {
            if(!tokenReadErr && token){
                data.delete('tokens', id, (tokenErr) => {
            if(!tokenErr){
                callback(200, {message: 'Token deleted successfully'})
            }else{
                callback(500, {error: 'Invalid request'});
            }
        });
            }else{
                callback(500, {error: 'Invalid request'});
            }
        });
    }else{
        callback(500, {error: 'Invalid request'});
    }

};

module.exports = handler;