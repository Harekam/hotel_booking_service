/**
 * Created by harekam on 13/03/18.
 */
'use strict';

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    DO_NOT_PROCESS: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_FAILURE: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ALREADY_EXISTS_CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    SERVER_ERROR: 500
};

const SORT_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC'
};

const DATE_FORMAT = 'YYYY-MM-DD';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm';
const READABLE_DATETIME_FORMAT = "dddd, MMMM Do YYYY, hh:mm A";
const TIMEZONE_INDIA = "Asia/Kolkata";
const JAVASCRIPT_TIMESTAMP_FORMAT = 'YYYY/MM/DD HH:mm';
const DEFAULT_LIMIT = 50;

const REGEX = {
    SPECIAL_CHAR_REMOVAL: /[^A-Z0-9]/ig,
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,
    ALPHA_SPACE_DOT: /^[a-zA-Z\s\.]+$/,
    ALPHA_NUM_UNDER: /^[a-z0-9_\.]*$/,
    PHONE_NUMBER: /^[1-9][0-9]*$/,
    NUMBER_ONLY: /^[0-9]+$/,
    OTP_NUMBER: /^[0-9]*$/,
    YEAR_NUMBER_ONLY: /^[1-9][0-9]*$/,
    ALPHABET_ONLY: /^[a-zA-Z ]*$/
};

const DEVICE_TYPE = {
    ANDROID: 'ANDROID',
    IOS: 'IOS',
    WEB: 'WEB'
};

const TIME_UNITS = {
    MONTHS: 'months',
    MILLI: 'milli',
    HOURS: 'hours',
    MINUTES: 'minutes',
    YEARS: 'years',
    SECONDS: 'seconds',
    WEEKS: 'weeks',
    DAYS: 'days'
};

const BOOKING_STATUS = {
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
    BOOKED: 'BOOKED'
};
module.exports = {
    REGEX,
    DATE_FORMAT,
    TIMESTAMP_FORMAT,
    SORT_ORDER,
    STATUS_CODE,
    TIMEZONE_INDIA,
    DEFAULT_LIMIT,
    READABLE_DATETIME_FORMAT,
    JAVASCRIPT_TIMESTAMP_FORMAT,
    DEVICE_TYPE,
    TIME_UNITS,
    BOOKING_STATUS
};