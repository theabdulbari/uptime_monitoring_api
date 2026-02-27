/*
title: Data crud.
Author: Abdul Bari.
Date: 27-02-2026.
Description: Add, Read, Edit, Delete data.
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

// read data from file
lib.read = (dir, file, callback) => {
    // open file
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (fileReadErr, data) => {
            callback(fileReadErr, data);
    });
}

// update existing data
lib.update = (dir, file, data, callback) => {
    // open file
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (fileOpenErr, fileDescriptor) => {
        if( !fileOpenErr && fileDescriptor) {
            // conver data to string
            const stringData = JSON.stringify(data);

            // truncate file
            fs.ftruncate(fileDescriptor, (truncateError) => {
                if(!truncateError)
                {
                    fs.writeFile(fileDescriptor, stringData, (fileWriteErr) => {
                        if(!fileWriteErr){
                            fs.close(fileDescriptor, (fileCloseErr) => {
                                if(!fileCloseErr){
                                    callback(false);
                                }else{
                                    callback('unable to close file');
                                }
                            });
                        }else{
                            callback('Unable to write file');
                        }
                    });
                }else{
                    callback('unable to truncate file');
                }
            });
        }else{
            callback('Unable to update, file may not exists');
        }

    });
}


module.exports = lib;