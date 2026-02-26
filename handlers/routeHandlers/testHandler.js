/*
title: Test Handler
Author: Abdul Bari.
Date: 25-02-2026.
Description: Test handler.
*/

// module scaffolding
const handler = {};

handler.testHandler = (reqProperties, res) => {
    res(200, {
        message: 'Test successfully run',
    });
};

module.exports = handler;