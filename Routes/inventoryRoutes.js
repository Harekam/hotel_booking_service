'use strict';
const inventoryController = require('../Controllers').inventoryController;
const { constants, responseMessages } = require('../Configs');
const {
    REGEX,
    CONTENT_BOUNDS,
    TIME_UNITS,
    DEFAULT_ROOM_TIME_CONSTRAINTS,
    DEFAULT_LIMIT,
    DAYS
} = constants;
const { failActionFunction } = require('../Utilities/util');
const { DefaultResponse } = responseMessages;
const Joi = require('joi');
const tags = ['api', 'inventory'];

const tweakInventory = {
    method: 'PUT',
    path: '/api/v1/inventory',
    config: {
        description: 'tweak inventory',
        tags,
        handler: (request, reply) => {
            inventoryController.updateInventories(request.payload, (error, success) => {
                if (error)
                    return reply(error.response).code(error.statusCode);
                return reply(null, success.response).code(success.statusCode);
            });
        },
        validate: {
            payload: {
                roomTypeId: Joi.string().required().trim().regex(REGEX.OBJECT_ID),
                totalRooms: Joi.number().min(0).integer().optional(),
                roomPrice: Joi.number().min(0).optional(),
                fromDate: Joi.date().optional(),
                toDate: Joi.date().optional(),
                days: Joi.array().items(
                    Joi.string().required().valid(
                        DAYS.MONDAY,
                        DAYS.TUESDAY,
                        DAYS.WEDNESDAY,
                        DAYS.THURSDAY,
                        DAYS.FRIDAY,
                        DAYS.SATURDAY,
                        DAYS.SUNDAY
                    )
                ).unique().optional()
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
    tweakInventory
];