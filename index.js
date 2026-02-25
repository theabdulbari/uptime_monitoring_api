/*
title: Uptime Monitoring API.
Author: Abdul Bari.
Date: 25-02-2026.
Description: Uptime Monitoring API is a lightweight pure Node.js application that monitors website and API availability. It performs scheduled health checks, tracks response times, and logs uptime/downtime data.
*/

// Importing the required modules.
const http = require('http');
const { handleRequestResponse } = require('./helpers/handleReqRes');


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
app.handleRequestResponse = handleRequestResponse;

app.createServer();