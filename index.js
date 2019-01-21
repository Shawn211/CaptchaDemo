'use strict';

const colors  = require('colors');
const os = require('os');
const pkg = require('./package.json');
const express = require('./initializer');
const config = require('./config/config');

try {
    let app = express.init();
    let numCPUs = os.cpus().length;

    // Start up the server on the port specified in the config after we connected to mongodb
    app.listen(config.server.port, () => {
        var serverBanner = ['',
            '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
            '*',
            '* @cpus: ' + numCPUs,
            '* ' + pkg.description ,
            '* @version ' + pkg.version,
            '* @author ' + pkg.author,
            '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author,
            '* @license ' + pkg.license + ', ' + pkg.license,
            '*',
            '*' + ' App started on port: '.blue + config.server.port + ' - with environment: '.blue + config.environment.blue,
            '*',
            '*************************************************************************************************',
            ''].join('\n');
        console.info(serverBanner);
    })
} catch (err) {
    console.error(err);
}