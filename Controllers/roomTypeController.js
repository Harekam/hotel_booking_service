/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const async = require('async');
const Services = require('../Services');
const { constants } = require('../Configs');
const { TIME_UNITS, STATUS_CODE } = constants;
const {
    convertToDays,
    getCustomDate,
    createErrorResponse,
    createSuccessResponse,
    getDay
} = require('../Utilities/util');

function addRoomType(payload, callbackRoute) {
    async.auto({
        createRoomType: (callback) => {
            Services.roomType.addRoomType(payload, callback);
        },
        createInventory: ['createRoomType', (results, callback) => {
            const { _id, advanceBookingTimeConstraint, totalRooms, roomPrice } = results.createRoomType;
            const inventories = [];
            const totalDays = convertToDays(advanceBookingTimeConstraint);
            const now = new Date();
            let date = now;
            let i = 1;
            do {
                inventories.push({
                    roomType: _id,
                    date,
                    day: getDay(date),
                    availableRooms: totalRooms,
                    price: roomPrice
                });
                date = getCustomDate(date, true, TIME_UNITS.DAYS, 1);
                i++;
            } while (i <= totalDays);
            Services.inventory.addInventories(inventories, callback);
        }]
    }, (error, result) => {
        if (error) return callbackRoute(createErrorResponse(error));
        return callbackRoute(createSuccessResponse(null, STATUS_CODE.CREATED, { _id: result.createRoomType._id }));
    });
}

function getRoomTypes(queryParams, callbackRoute) {
    async.auto({
        totalRoomTypes: (callback) => {
            Services.roomType.totalRoomTypes({}, callback);
        },
        roomTypes: (callback) => {
            Services.roomType.getRoomTypes(queryParams, callback);
        }
    }, (error, result) => {
        if (error) return callbackRoute(createErrorResponse(error));
        return callbackRoute(createSuccessResponse(null, STATUS_CODE.OK, result));
    });
}

module.exports = {
    addRoomType,
    getRoomTypes
};