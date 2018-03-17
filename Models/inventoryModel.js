/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbConfig } = require('../Configs');
const { MODEL_NAMES } = dbConfig;

const inventory = new Schema({
    roomType: {
        type: Schema.ObjectId,
        ref: MODEL_NAMES.ROOM_TYPE,
        required: true
    },
    date: { type: Date, required: true },
    day: { type: String, required: true },
    availableRooms: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model(MODEL_NAMES.INVENTORY, inventory);