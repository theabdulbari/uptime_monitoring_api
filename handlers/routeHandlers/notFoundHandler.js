/*
title: Not Found Handler
Author: Abdul Bari.
Date: 25-02-2026.
Description: 404 Not found handler.
*/

// module scaffolding
const handler = {};

handler.notFoundHandler = (reqProperties, res) => {
    res(404, {
        message: '404 Not Found',
    })
};

module.exports = handler;