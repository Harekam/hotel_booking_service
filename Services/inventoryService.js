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
function updateInventories(data, callback) {
    const query = {
        roomType: data.roomTypeId
    };
    if (data.fromDate && data.toDate) {
        query.date = { $gte: data.fromDate, $lte: data.toDate };
    } else if (data.fromDate && !data.toDate) {
        query.date = { $gte: data.fromDate };
    } else if (!data.fromDate && data.toDate) {
        query.date = { $lte: data.toDate };
    }
    if (Array.isArray(data.days)) {
        query.day = { $in: data.days };
    }
    const updateData = {};
    if (typeof data.totalRooms === 'number') {
        updateData.availableRooms = data.totalRooms;
    }
    if (typeof data.roomPrice === 'number') {
        updateData.price = data.roomPrice;
    }
    DaoManager.update(MODEL, query, updateData, { multi: true }, callback);
}
module.exports = {
    addInventories,
    updateInventories
};