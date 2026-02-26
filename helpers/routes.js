/*
title: Routes
Author: Abdul Bari.
Date: 25-02-2026.
Description: Application routes.
*/
// dependencies 
const { testHandler } = require('../handlers/routeHandlers/testHandler');

const routes = {
    'test': testHandler,
};

module.exports = routes;