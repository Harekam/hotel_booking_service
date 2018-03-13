/**
 * Created by harekam on 13/03/18.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../Config');
const constants = config.CONSTANTS;
const MODEL_NAMES = config.dbConfig.MODEL_NAMES;

const surveySubmission = new Schema({
    survey: {
        type: Schema.ObjectId,
        ref: MODEL_NAMES.SURVEY,
        required: true,
        index: true
    },
    isMultipleSubmissionAllowed: {
        type: Boolean,
        default: false
    },
    creationSourceId: {
        type: String
    },
    customPayload: {
        type: Schema.Types.Mixed
    },
    type: {
        type: String,
        enum: [
            constants.FEATURES.POLL,
            constants.FEATURES.SURVEY
        ]
    },
    status: {
        type: String,
        required: true,
        enum: [
            constants.SURVEY_SUBMISSION_STATUS.QUEUE,
            constants.SURVEY_SUBMISSION_STATUS.SUBMITTED,
            constants.SURVEY_SUBMISSION_STATUS.PENDING,
            constants.SURVEY_SUBMISSION_STATUS.FAILURE
        ]
    },
    failureRetryCount: {
        type: Number,
        default: 0
    },
    ipAddress: {
        type: String
    },
    user: {
        type: String,
        ref: MODEL_NAMES.USER,
        required: true
    },
    forUser: {
        type: String,
        ref: MODEL_NAMES.USER
    },
    answers: [{
        questionId: {
            type: Schema.ObjectId,
            required: true
        },
        dataType: {
            type: String,
            required: true,
            default: [
                constants.DATA_TYPE.STRING,
                constants.DATA_TYPE.NUMBER,
                constants.DATA_TYPE.DATE,
                constants.DATA_TYPE.TIME
            ]
        },
        answer: {
            type: Array,
            required: true
        },
        comment: {
            type: String
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    expireAt: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
surveySubmission.virtual('userDetails', {
    ref: MODEL_NAMES.USER, // The model to use
    localField: 'user', // Find people where `localField`
    foreignField: 'userRefNum' // is equal to `foreignField`
});
module.exports = mongoose.model(MODEL_NAMES.SURVEY_SUBMISSION, surveySubmission);