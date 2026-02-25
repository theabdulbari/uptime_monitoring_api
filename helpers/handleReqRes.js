/*
title: Handle Request Response.
Author: Abdul Bari.
Date: 25-02-2026.
Description: Handle request response.
*/

// module dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

// module scaffolding
const handler = {};

handler.handleRequestResponse = (req, res) => {
    // request handling
    // get url and parsing
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello wowo')
    });

    
};

module.exports = handler;