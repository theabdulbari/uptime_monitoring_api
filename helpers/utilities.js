/*
title: Utilities
Author: Abdul Bari.
Date: 01-03-2026.
Description: Important utilities.
*/

// dependencies
const crypto = require('crypto');

// module scaffoldings
const utilities = {};

// parse json to object
utilities.parseJSON = (jsonString) => {
    let output = {};

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// password hash
utilities.hash = (str) => {
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', 'codeneverlie').update(str).digest('hex');
        return hash;
    }
    return false;
    
};

// rando string
utilities.randString = (strLength) => {
    let length = strLength;
    if(typeof(strLength) === 'number' && strLength > 0){
        let customChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for(let i = 1; i <= length; i+= 1 ){
            let randChar = customChar.charAt(Math.floor(Math.random() * customChar.length));
            output += randChar;
        }
        return output;
    }
    return false;
    
};

// export module
module.exports = utilities;