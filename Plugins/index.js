/**
 * Created by harekamsingh on 14/12/16.
 */
'use strict';
const Inert = require('inert'),
    Vision = require('vision');
module.exports = [
    Inert,
    Vision, {
        register: require('./swagger')
    }, {
        register: require('./good-console')
    }
];