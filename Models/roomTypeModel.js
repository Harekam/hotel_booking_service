/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { constants, dbConfig } = require('../Configs');
const { TIME_UNITS, DEFAULT_ROOM_TIME_CONSTRAINTS } = constants;

const roomType = new Schema({
    roomTypeName: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    roomPrice: { type: Number, required: true },
    advanceBookingTimeConstraint: {
        frequency: { type: Number, default: DEFAULT_ROOM_TIME_CONSTRAINTS.frequency },
        unit: {
            type: String,
            enum: [
                TIME_UNITS.DAYS,
                TIME_UNITS.MONTHS,
                TIME_UNITS.WEEKS,
                TIME_UNITS.YEARS
            ],
            default: DEFAULT_ROOM_TIME_CONSTRAINTS.unit
        }
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model(dbConfig.MODEL_NAMES.ROOM_TYPE, roomType);