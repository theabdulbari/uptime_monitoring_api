/*
title: Uptime Monitoring API.
Author: Abdul Bari.
Date: 25-02-2026.
Description: Uptime Monitoring API is a lightweight pure Node.js application that monitors website and API availability. It performs scheduled health checks, tracks response times, and logs uptime/downtime data.
*/

// Importing the required modules.
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');


// module scaffolding.
const app = {};

// configuration.
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleRequestResponse);
    server.listen(app.config.port, () => {
        console.log('server listening port ' + app.config.port);
    });
};


// handle request response
app.handleRequestResponse = (req, res) => {
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

app.createServer();