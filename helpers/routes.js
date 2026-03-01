/*
title: Routes
Author: Abdul Bari.
Date: 25-02-2026.
Description: Application routes.
*/
// dependencies 
const { testHandler } = require('../handlers/routeHandlers/testHandler');
const { userHandler } = require('../handlers/routeHandlers/userHandler');

const routes = {
    test: testHandler,
    user: userHandler,
};

module.exports = routes;