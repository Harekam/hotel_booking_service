/**
 * Created by harekam on 13/03/18.
 */
'use strict';
let log4js = require('log4js');
let logger = log4js.getLogger('[DaoManager]');
/*
 ----------------------------------------
 GET DATA
 ----------------------------------------
 */
exports.getData = function (model, query, projection, options, callback) {
    model.find(query, projection, options, (err, data) => {
        if (err) {
            logger.error("Get Data", err);
            return callback(err);
        }
        return callback(null, data);
    });
};

/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
exports.aggregateData = function (model, group, callback) {
    model.aggregate(group, (err, data) => {

        if (err) {
            logger.error("Aggregate Data", err);
            return callback(err);
        }
        return callback(null, data);
    });
};
/*
 ----------------------------------------
 AGGREGATE DATA WITH POPULATE
 ----------------------------------------
 */
exports.aggregateDataWithPopulate = function (model, group, populateOptions, callback) {
    model.aggregate(group, (err, data) => {

        if (err) {
            logger.error("Aggregate Data", err);
            return callback(err);
        }

        model.populate(data, populateOptions,
            function (err1, populatedDocs) {

                if (err1) return callback(err1);
                return callback(null, populatedDocs);// This object should now be populated accordingly.
            });
        //return callback(null, data);
    });
};


/*
 ----------------------------------------
 SET DATA
 ----------------------------------------
 */
exports.setData = function (model, data, callback) {

    new model(data).save((err, resultData) => {

        if (err) {
            logger.error("SET DATA: ", err);
            return callback(err);
        }

        let result = resultData.toObject();
        delete result.__v;
        callback(null, result);

    });
};


/*
 ----------------------------------------
 DELETE DATA
 ----------------------------------------
 */
exports.deleteData = function (model, conditions, callback) {

    model.remove(conditions, (err, removed) => {

        if (err) {
            logger.error("Delete Data", err);
            return callback(err);
        }
        return callback(null, removed);


    });
};

/*
 ----------------------------------------
 BATCH INSERT
 ----------------------------------------
 */
exports.batchInsert = function (model, batchData, options, callback) {
    model.collection.insert(batchData, options, (error, docs) => {

        if (error) {
            logger.error("Batch insert:", error);
            return callback(error);
        }

        return callback(null, docs);

    });
};


exports.getCount = function (model, condition, callback) {
    model.count(condition, (error, count) => {
        if (error) {
            logger.error("Error Get Count: ", error);
            return callback(error);
        }
        return callback(null, count);
    })
};

/*
 ----------------------------------------
 UPDATE DATA
 ----------------------------------------
 */
exports.update = function (model, conditions, update, options, callback) {
    model.update(conditions, update, options, (err, result) => {

        if (err) {
            logger.error("Update Query: ", err);
            return callback(err);
        }
        logger.trace("Update Result: ", JSON.stringify(result));
        return callback(null, result);

    });
};

exports.getDistinctData = function (model, field, condition, callback) {
    model.distinct(field, condition, (error, result) => {
        if (error) {
            logger.error("Distinct Data", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

exports.findOneAndUpdateData = function (model, conditions, update, options, callback) {
    model.findOneAndUpdate(conditions, update, options, (error, result) => {
        if (error) {
            logger.error("Find one and update", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

/*
 ----------------------------------------
 GET DATA WITH REFERENCE
 ----------------------------------------
 */
exports.getDataWithReference = function (model, query, projection, options, collectionOptions, callback) {
    model.find(query, projection, options).populate(collectionOptions).exec((err, data) => {

        if (err) {
            logger.error("Error Data reference: ", err);
            return callback(err);
        }
        return callback(null, data);

    });
};