'use strict';

const logger = require('log4js').getLogger();
const gmapi = require('./gmapi');
/**
 * Battery
 *
 * vehicleid Long 
 * returns BatteryRangeResponse
 **/
exports.getBatteryByVehicleId = function (params,res,next) {

}

/**
 * Security
 *
 * vehicleid Integer 
 * returns SecurityResponse
 **/
exports.getDoorsByVehicleId = function (params,res,next) {

}


/**
 * Fuel
 *
 * vehicleid Long 
 * returns FuelRangeResponse
 **/
exports.getFuelByVehicleId = function (params,res,next) {

}


/**
 * Vehicle Info.
 *
 * vehicleid Integer 
 * returns VehicleInfoResponse
 **/
exports.getVehicleInfoByVehicleId = function (params,res,next) {
    logger.debug("HERE___HERE");
    logger.debug(params['vehicleid']);
    processResponse("getVehicleInfoById",res,gmapi.getVehicleInfo(
        params.vehicleid.value
    ));
}


/**
 * START/STOP engine
 *
 * vehicleid Long 
 * body EngineRequest 
 * returns EngineResponse
 **/
exports.triggerEngineByVehicleId = function (params,res,next) {

}

function processResponse(name,res,responsePromise){
    responsePromise.then ( (serviceResponse) => {
        logger.debug("Successful request for : "+name);
    res.end(JSON.stringify(serviceResponse));

}, (errorResponse)=>{
        logger.error("Error processing request method :"+name);
        res.statusCode = errorResponse.statusCode || 500;
        res.end(JSON.stringify(errorResponse),'utf-8');
    }).catch( (err)=>{
        logger.error("Fatal Error processing request:"+name+" "+ err);
    res.statusCode = 500;
    res.end(JSON.stringify(err));
});
}



