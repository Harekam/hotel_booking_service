/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const DaoManager = require('./DaoManager');
const models = require('../Models');
const MODEL = models.inventory;

function addInventories(data, callback) {
    DaoManager.batchInsert(MODEL, data, { ordered: false }, callback);
}

module.exports = {
    addInventories
};