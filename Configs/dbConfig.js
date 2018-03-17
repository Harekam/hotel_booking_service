/**
 * Created by harekam on 13/03/18.
 */
'use strict';

const mongodbURI = process.env.MONGO_URI || 'mongodb://localhost/hotel_booking_service';

const MODEL_NAMES = {
    ROOM_TYPE: 'roomType',
    BOOKING: 'booking',
    INVENTORY: 'inventory'
};

module.exports = {
    mongodbURI,
    MODEL_NAMES
};