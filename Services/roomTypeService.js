/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const DaoManager = require('./DaoManager');
const models = require('../Models');
const { constants } = require('../Config');
const MODEL = models.roomType;

function addRoomType(data, callback) {
    DaoManager.setData(MODEL, data, callback);
}

module.exports = {
    addRoomType
};