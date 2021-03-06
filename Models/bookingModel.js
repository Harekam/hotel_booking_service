/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { constants, dbConfig } = require('../Configs');
const { MODEL_NAMES } = dbConfig;
const { BOOKING_STATUS, TIMEZONE_INDIA } = constants;

const booking = new Schema({
    roomType: {
        type: Schema.ObjectId,
        ref: MODEL_NAMES.ROOM_TYPE,
        required: true
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    fromDateUTC: { type: Date, required: true },
    toDateUTC: { type: Date, required: true },
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date },
    amount: { type: Number, required: true },
    timezone: { type: String, default: TIMEZONE_INDIA },
    bookingStatus: {
        type: String,
        enum: [
            BOOKING_STATUS.BOOKED,
            BOOKING_STATUS.PENDING,
            BOOKING_STATUS.CANCELLED
        ],
        default: BOOKING_STATUS.PENDING
    }
}, { timestamps: true });

module.exports = mongoose.model(MODEL_NAMES.BOOKING, booking);