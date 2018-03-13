'use strict';
const CONSTANTS = require('./constants');
const Joi = require('joi');

const ERROR_MESSAGES = {
    'SOMETHING_WRONG': 'Something went wrong.',
    'INVALID_REQUEST': 'Invalid Request.',
    'DATA_NOT_FOUND': 'Data not found.',
    'NO_DATA_UPDATED': 'No data updated.',
    'WRONG_PARAMETER': 'Wrong parameter.',
    'DUPLICATE_ENTRY': 'Duplicate Entry.',
    'DUPLICATE_EMAIL': 'Duplicate email id.',
    'DUPLICATE_SLOT': 'Duplicate slot on ',
    'INVALID_REQUEST_ID': 'Invalid request id.',
    'INVALID_DATA': 'Invalid data.',
    'ACCESS_DENIED': 'Access Denied.',
    'ACTION_NOT_ALLOWED': 'You are not allowed to perform this action.',
    'INVALID_DATE': 'Invalid date.',
    'INVALID_USER_ID': "Invalid user id.",
    'ACTION_NO_AUTH': "You are not authorize to perform this action.",
    'BOOK_PAST_DATE': "Cannot create booking of past."
};
const SUCCESS_MESSAGES = {
    'ACTION_COMPLETE': 'Action complete.'
};

const ERROR_CODES = {
    EMAIL_SENT_FAIL: 1
};
const SUCCESS_CODES = ERROR_CODES; //Error and success codes should be unique all across
let SWAGGER_DEFAULT_RESPONSE_MESSAGES = {};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.OK] = {
    'description': 'OK'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.CREATED] = {
    'description': 'Created'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.BAD_REQUEST] = {
    'description': 'Bad Request'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.UNAUTHORIZED] = {
    'description': 'Unauthorized'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.NOT_FOUND] = {
    'description': 'Not Found'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.ALREADY_EXISTS_CONFLICT] = {
    'description': 'Already Exists'
};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.SERVER_ERROR] = {
    'description': 'Internal Server Error'
};

const SUCCESS_OBJECT = Joi.object().keys({
    message: Joi.string(),
    statusCode: Joi.number(),
    data: Joi.any()
}).label('Success Response');
const ERROR_OBJECT = Joi.object().keys({
    message: Joi.string(),
    statusCode: Joi.number(),
    data: Joi.any()
}).label('Error Response');
class DefaultResponse {
    constructor(statusCode, response) {
        this[CONSTANTS.STATUS_CODE.OK] = {
            'description': 'OK',
            schema: SUCCESS_OBJECT
        };
        this[CONSTANTS.STATUS_CODE.CREATED] = {
            'description': 'Created'
        };
        this[CONSTANTS.STATUS_CODE.BAD_REQUEST] = {
            'description': 'Bad Request',
            schema: ERROR_OBJECT
        };
        this[CONSTANTS.STATUS_CODE.UNAUTHORIZED] = {
            'description': 'Unauthorized'
        };
        this[CONSTANTS.STATUS_CODE.NOT_FOUND] = {
            'description': 'Not Found'
        };
        this[CONSTANTS.STATUS_CODE.ALREADY_EXISTS_CONFLICT] = {
            'description': 'Already Exists'
        };
        this[CONSTANTS.STATUS_CODE.SERVER_ERROR] = {
            'description': 'Internal Server Error'
        };
        if (statusCode && response)
            this[statusCode].schema = response;
    }
}

module.exports = {
    ERROR_CODES,
    SUCCESS_MESSAGES,
    SWAGGER_DEFAULT_RESPONSE_MESSAGES,
    ERROR_MESSAGES,
    DefaultResponse,
    SUCCESS_CODES
};