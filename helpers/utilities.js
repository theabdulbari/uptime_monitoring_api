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

// export module
module.exports = utilities;