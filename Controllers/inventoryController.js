/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const async = require('async');
const Services = require('../Services');
const { constants, responseMessages } = require('../Configs');
const { TIME_UNITS, STATUS_CODE } = constants;
const { ERROR_MESSAGES } = responseMessages;
const {
    convertToDays,
    getCustomDate,
    createErrorResponse,
    createSuccessResponse,
    getDay
} = require('../Utilities/util');

function updateInventories(payload, callbackRoute) {
    async.auto({
        tweak: (callback) => {
            if (typeof payload.totalRooms !== 'number' && typeof payload.roomPrice !== 'number') {
                return callback(ERROR_MESSAGES.NO_DATA_UPDATED);
            }
            Services.inventory.updateInventories(payload, callback);
        }
    }, (error, result) => {
        if (error) return callbackRoute(createErrorResponse(error));
        return callbackRoute(createSuccessResponse());
    });
}

module.exports = {
    updateInventories
};