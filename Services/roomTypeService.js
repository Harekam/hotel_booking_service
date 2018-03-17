/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const DaoManager = require('./DaoManager');
const models = require('../Models');
const { constants } = require('../Configs');
const MODEL = models.roomType;

function addRoomType(data, callback) {
    DaoManager.setData(MODEL, data, callback);
}
function getRoomTypes(data, callback) {
    DaoManager.getData(MODEL, { isDeleted: false }, { __v: 0 }, {
        limit: data.limit, skip: data.skip, sort: {
            createdAt: -1
        }
    }, callback);
}
function totalRoomTypes(data, callback) {
    DaoManager.getCount(MODEL, { isDeleted: false }, callback);
}

module.exports = {
    addRoomType,
    getRoomTypes,
    totalRoomTypes
};