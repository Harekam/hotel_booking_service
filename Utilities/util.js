/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const { constants, responseMessages } = require('../Configs');
const _ = require('lodash');
const moment = require('moment');
require('moment-timezone');
require('moment-range');
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = responseMessages;
const { STATUS_CODE, TIME_UNITS, TIMEZONE_INDIA, JAVASCRIPT_TIMESTAMP_FORMAT } = constants;

function failActionFunction(request, reply, source, error) {

    if (error.isBoom) {

        delete error.output.payload.validation;
        delete error.output.payload.error;
        delete error.output.payload.statusCode;

        if (error.output.payload.message.indexOf("authorization") !== -1) {
            error.output.statusCode = STATUS_CODE.UNAUTHORIZED;
            error.output.payload.message = ERROR_MESSAGES.ACCESS_DENIED;
            error.output.payload.data = {};
            // error.output.payload.statusCode = STATUS_CODE.UNAUTHORIZED;
            return reply(error);
        }
        let details = error.data.details[0];
        if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
            error.output.payload.message = "Invalid " + details.path;
            return reply(error);
        }
    }
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    error.output.payload.data = {};
    delete error.output.payload.validation;
    delete error.output.payload.error;
    delete error.output.payload.statusCode;
    return reply(error);
}
function createErrorResponse(message, statusCode, error, errorCode) {

    try {
        if (_.isObject(message)) {
            error = message;
            message = null;
        }
        if (error) {
            if (error.hasOwnProperty('statusCode') && error.hasOwnProperty('response')) {
                error.response.statusCode = error.response.statusCode || 0;
                return error;
            }

            if (typeof error === 'object') {
                if (error.name === 'MongoError') {
                    if (error.code === 11000) {
                        if (error.message.indexOf("phoneNumber") != -1) {
                            message = ERROR_MESSAGES.PHONE_NUMBER_ALREADY_EXISTS;
                        } else if (error.message.indexOf("email") != -1) {
                            message = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
                        } else if (error.message.indexOf("socialId") != -1) {
                            message = ERROR_MESSAGES.ALREADY_REGISTERED_SOCIAL;
                        }
                        else {
                            message = ERROR_MESSAGES.DUPLICATE_ENTRY;
                        }
                        statusCode = STATUS_CODE.ALREADY_EXISTS_CONFLICT;
                    }
                } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
                    message = ERROR_MESSAGES.INVALID_ID;
                }
            }
        }
    } catch (e) {
        return {
            response: {
                message: message || ERROR_MESSAGES.SOMETHING_WRONG,
                statusCode: errorCode || 0,
                data: {}
            },
            statusCode: statusCode || STATUS_CODE.BAD_REQUEST
        };
    }
    return {
        response: {
            message: message || ERROR_MESSAGES.SOMETHING_WRONG,
            statusCode: errorCode || 0,
            data: {}
        },
        statusCode: statusCode || STATUS_CODE.BAD_REQUEST
    };

}
function createSuccessResponse(message, statusCode, data, successCode) {
    if (message)
        if (message.hasOwnProperty('statusCode') && message.hasOwnProperty('response')) {
            message.response.statusCode = message.response.statusCode || 0;
            return message;
        }
    return {
        response: {
            message: message || SUCCESS_MESSAGES.ACTION_COMPLETE,
            statusCode: successCode || 0,
            data: data || {}
        },
        statusCode: statusCode || STATUS_CODE.OK
    };
}

function getTimestamp(inDate) {
    if (inDate)
        return new Date();

    return new Date().toISOString();
}
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function generateRandomString(length, isNumbersOnly) {
    let charsNumbers = '0123456789';
    let charsLower = 'abcdefghijklmnopqrstuvwxyz';
    let charsUpper = charsLower.toUpperCase();
    let chars;

    if (isNumbersOnly)
        chars = charsNumbers;
    else
        chars = charsNumbers + charsLower + charsUpper;

    if (!length) length = 32;

    let string = '';

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
}

function validateTimezone(timezone) {
    if (timezone.toLowerCase() === "utc" ||
        timezone.toLowerCase() === "est" ||
        timezone.toLowerCase() === "gmt") return false;
    let result = moment.tz.zone(timezone);
    return !isEmpty(result);
}

function getRange(startDate, endDate, diffIn) {

    let dr = moment.range(startDate, endDate);

    if (!diffIn)
        diffIn = TIME_UNITS.HOURS;
    if (diffIn == TIME_UNITS.MILLI)
        return dr.diff();

    return dr.diff(diffIn);

}
function createValidJson(payload) {
    let data = {};
    for (let key in payload) {
        if (payload.hasOwnProperty(key) && checkFalsyValues(payload[key])) {
            data[key] = payload[key];
        }
    }
    return data;
}
function checkFalsyValues(data) {
    if (data === "" || data === null || data === undefined)
        return false;
    if (_.isBoolean(data) || _.isNumber(data))
        return true;
    return true;
}


let makeArrayOfKey = function (data, keyName) {
    let arrIds = [];
    keyName = !keyName ? '_id' : keyName;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            arrIds.push(data[key][keyName]);
        }
    }
    return arrIds;
};
function getCustomDate(date, inDate, unit, frequency) {

    let end = moment(date).add(frequency, unit).toDate();

    if (inDate)
        return end;
    return end.toISOString();
}
function createHashFromObjectArray(data, keyOne, keyTwo) {
    let len = data.length;
    let map = {};
    for (let i = 0; i < len; i++) {
        if (keyOne)
            map[data[i][keyOne]] = data[i][keyTwo] || data[i] || true;
    }
    return map;
}
function formatDateTime(datetime, format, inMoment) {
    if (!format) {
        format = constants.TIMESTAMP_FORMAT;
    }
    let momentDateTime = moment(datetime).format(format);
    if (inMoment)
        return momentDateTime;
    return new Date(momentDateTime);
}

function getLocalTimestamp(datetime, timezone, format, indiaFix) {
    timezone = indiaFix || !timezone ? TIMEZONE_INDIA : timezone;
    let dateTimeLocal = moment.tz(datetime, timezone);
    if (format === "iso") {
        return dateTimeLocal.format();
    }
    format = !format ? JAVASCRIPT_TIMESTAMP_FORMAT : format;
    return dateTimeLocal.format(format);
}
function checkDateIsBefore(dateOne, dateTwo, matchOn) {
    if (_.isDate(dateOne))
        dateOne = dateOne.toISOString();
    else
        dateOne = new Date(dateOne).toISOString();
    if (_.isDate(dateTwo))
        dateTwo = dateTwo.toISOString();
    else
        dateTwo = new Date(dateTwo).toISOString();

    if (matchOn)
        return moment(dateOne).isBefore(dateTwo, matchOn);
    return moment(dateOne).isBefore(dateTwo);
}
function checkDateIsAfter(dateOne, dateTwo, matchOn) {
    if (_.isDate(dateOne))
        dateOne = dateOne.toISOString();
    else
        dateOne = new Date(dateOne).toISOString();
    if (_.isDate(dateTwo))
        dateTwo = dateTwo.toISOString();
    else
        dateTwo = new Date(dateTwo).toISOString();
    if (matchOn)
        return moment(dateOne).isAfter(dateTwo, matchOn);
    return moment(dateOne).isAfter(dateTwo);
}

function getDay(date) {
    if (!date)
        date = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[date.getDay()];
}
function getMonthName(date) {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (!date)
        date = new Date();
    return monthNames[date.getMonth()];

}
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function htmlUnEscape(str) {
    return String(str)
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}
function createHashOfArray(array, val) {
    let map = {};
    let len = array.length;
    for (let i = 0; i < len; i++) {
        map[array[i]] = val || true;
    }
    return map;
}
function isContains(element, array) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        if (element == array[i])
            return true;
    }
    return false
}

function convertLocalTimeToUTC(date, timezone) {
    let wrap = moment(date).format(constants.TIMESTAMP_FORMAT);
    let momentTime = moment.tz(wrap, timezone);
    // logger.info(wrap, momentTime, date, timezone);
    return new Date(momentTime.format()).toISOString();
}
function getTodayAndTomorrow(inDate, timezone) {
    let timeToday = new Date();
    if (timezone) {
        timeToday = new Date(getLocalTimestamp(new Date(), timezone));
    }
    let today = moment(timeToday).startOf('day').toDate(),
        tomorrow = moment(today).add(1, 'days').toDate();
    if (inDate)
        return { today: today, tomorrow: tomorrow };

    return { today: today.toISOString(), tomorrow: tomorrow.toISOString() };

}
function getDateRange(options) {
    options = _.isObject(options) ? options : {};
    let unit = options.unit || constants.TIME_UNITS.DAYS;
    let date = options.date || new Date();
    let startDate = moment(date).startOf(unit).toDate();
    let endDate = moment(date).endOf(unit).toDate();
    if (options.inDate)
        return { startDate: startDate, endDate: endDate };

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}
function isSameDate(dateOne, dateTwo, matchOn) {
    return moment(dateOne).isSame(dateTwo, matchOn || 'day');
}

function mergeDateAndTime(date, time) {
    if (!_.isDate(date) || !_.isNumber(time))
        return date;
    let dateTime = new Date(date);
    dateTime.setMinutes(time);
    return dateTime;
}
module.exports = {
    mergeDateAndTime,
    failActionFunction,
    isSameDate,
    createSuccessResponse,
    createErrorResponse,
    getTimestamp,
    createValidJson,
    isEmpty,
    getTodayAndTomorrow,
    convertLocalTimeToUTC,
    makeArrayOfKey,
    getRange,
    validateTimezone,
    generateRandomString,
    getCustomDate,
    getLocalTimestamp,
    createHashFromObjectArray,
    formatDateTime,
    checkDateIsBefore,
    getDay,
    getMonthName,
    htmlEscape,
    htmlUnEscape,
    createHashOfArray,
    checkDateIsAfter,
    getDateRange
};
