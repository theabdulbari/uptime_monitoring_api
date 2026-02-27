/*
title: Uptime Monitoring API.
Author: Abdul Bari.
Date: 27-02-2026.
Description: Uptime Monitoring API is a lightweight pure Node.js application that monitors website and API availability. It performs scheduled health checks, tracks response times, and logs uptime/downtime data.
*/

// dependencies
const fs = require('fs');
const path = require('path');


const lib = {};

// data folder base path
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (fileOpenErr, fileDescriptor) => {
        if( !fileOpenErr && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file
            fs.writeFile(fileDescriptor, stringData, (fileWriteErr) => {
                if(!fileWriteErr){
                    fs.close(fileDescriptor, (fileCloseErr) => {
                        if(!fileCloseErr){
                            callback(false);
                        }else{
                            callback('Error in closig file');
                        }
                    });
                }else{
                    callback('Unable to write file');
                }
            });
        }else{
            callback('Unable to create file, already exists');
        }

    });
}