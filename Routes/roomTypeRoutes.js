'use strict';
const roomTypeController = require('../Controllers').roomTypeController;
const { constants, responseMessages } = require('../Configs');
const {
    REGEX,
    CONTENT_BOUNDS,
    TIME_UNITS,
    DEFAULT_ROOM_TIME_CONSTRAINTS,
    DEFAULT_LIMIT
} = constants;
const { failActionFunction } = require('../Utilities/util');
const { DefaultResponse } = responseMessages;
const Joi = require('joi');
const tags = ['api', 'roomType'];
const addRoomType = {
    method: 'POST',
    path: '/api/v1/roomType',
    config: {
        description: 'add roomType',
        tags,
        handler: (request, reply) => {
            roomTypeController.addRoomType(request.payload, (error, success) => {
                if (error)
                    return reply(error.response).code(error.statusCode);
                return reply(null, success.response).code(success.statusCode);
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
        },
        plugins: {
            'hapi-swagger': {
                responses: new DefaultResponse()
            }
        }
    }
};
const getRoomTypes = {
    method: 'GET',
    path: '/api/v1/roomType',
    config: {
        description: 'get roomTypes',
        tags,
        handler: (request, reply) => {
            roomTypeController.getRoomTypes(request.query, (error, success) => {
                if (error)
                    return reply(error.response).code(error.statusCode);
                return reply(null, success.response).code(success.statusCode);
            });
        },
        validate: {
            query: {
                limit: Joi.number().optional().integer().positive().default(DEFAULT_LIMIT),
                skip: Joi.number().optional().integer().min(0).default(0)
            },
            failAction: failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responses: new DefaultResponse()
            }
        }
    }
};
module.exports = [
    addRoomType,
    getRoomTypes
];