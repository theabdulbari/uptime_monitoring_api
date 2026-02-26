/*
title: Environments
Author: Abdul Bari.
Date: 26-02-2026.
Description: Environments configurations.
*/

// module scaffoldings
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
};

environments.production = {
    port: 5000,
    envName: 'produnction',
};

// determine the environment 
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export the environments
const environmentsToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export module
module.exports = environmentsToExport;