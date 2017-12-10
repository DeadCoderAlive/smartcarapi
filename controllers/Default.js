'use strict';

var Default = require('../service/DefaultService');
const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports.getBatteryByVehicleId = function getBatteryByVehicleId (req, res, next) {

  Default.getBatteryByVehicleId(req.swagger.params,res,next);
};

module.exports.getDoorsByVehicleId = function getDoorsByVehicleId (req, res, next) {
    Default.getDoorsByVehicleId(req.swagger.params,res,next);
};

module.exports.getFuelByVehicleId = function getFuelByVehicleId (req, res, next) {
    Default.getFuelByVehicleId(req.swagger.params,res,next);
};

module.exports.getVehicleInfo = function getVehicleInfo (req, res, next) {
   logger.debug("DEFAULT getVehicelInfo");
    Default.getVehicleInfoByVehicleId(req.swagger.params,res,next);
};

module.exports.triggerEngineByVehicleId = function triggerEngineByVehicleId (req, res, next) {
    Default.triggerEngineByVehicleId(req.swagger.params,res,next);
};
