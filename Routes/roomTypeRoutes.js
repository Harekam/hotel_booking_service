'use strict';
const roomTypeController = require('../Controllers').roomTypeController;
const { constants } = require('../Configs');
const {
    REGEX,
    CONTENT_BOUNDS,
    TIME_UNITS,
    DEFAULT_ROOM_TIME_CONSTRAINTS
} = constants;
const { failActionFunction } = require('../Utilities/util');
const Joi = require('joi');

const addRoomType = {
    method: 'POST',
    path: '/api/v1/roomType',
    config: {
        handler: (request, reply) => {
            roomTypeController.addRoomType(request.payload, (error, success) => {
                if (error)
                    return reply(error);
                return reply(null, success);
            });
        },
        validate: {
            payload: {
                roomTypeName: Joi.string().required().trim().regex(REGEX.ALPHABET_ONLY).min(CONTENT_BOUNDS.name.min).max(CONTENT_BOUNDS.name.max),
                totalRooms: Joi.number().positive().integer().required(),
                roomPrice: Joi.number().min(0).required(),
                advanceBookingTimeConstraint: Joi.object().keys({
                    frequency: Joi.number().positive().optional().default(DEFAULT_ROOM_TIME_CONSTRAINTS.frequency),
                    unit: Joi.string().optional().valid(
                        TIME_UNITS.DAYS,
                        TIME_UNITS.MONTHS,
                        TIME_UNITS.WEEKS,
                        TIME_UNITS.YEARS
                    ).default(DEFAULT_ROOM_TIME_CONSTRAINTS.unit)
                }).optional()
            },
            failAction: failActionFunction
        }
    }
};
module.exports = [
    addRoomType
];