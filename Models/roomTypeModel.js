/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { constants, dbConfig } = require('../Config');

const roomType = new Schema({
    roomTypeName: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    roomPrice: { type: Number, required: true },
    advanceBookingTimeConstraint: {
        frequency: { type: Number },
        unit: {
            type: String,
            enum: [
                constants.TIME_UNITS.DAYS,
                constants.TIME_UNITS.HOURS,
                constants.TIME_UNITS.MILLI,
                constants.TIME_UNITS.MINUTES,
                constants.TIME_UNITS.MONTHS,
                constants.TIME_UNITS.SECONDS,
                constants.TIME_UNITS.WEEKS,
                constants.TIME_UNITS.YEARS
            ]
        }
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model(dbConfig.MODEL_NAMES.ROOM_TYPE, roomType);