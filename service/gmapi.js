const gmapiUrl = "http://gmapi.azurewebsites.net";
const Q = require('q');
const axios = require('axios');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
const jsonFormatter = require('../utils/formatter');

axios.defaults.headers.post['Content-Type'] = 'application/json';

exports.getVehicleInfo = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getVehicleInfoService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            if(response.data.status === '200' || response.data.status === 200){
                defer.resolve(jsonFormatter.mapToFormat("VehicleInfoResponse",response.data.data));
            }
            else {
                defer.reject({statusCode: 404,message: "Failure"});
            }
        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(err);
        });
    return defer.promise;
}

exports.getSecurityStatus = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getSecurityStatusService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
            if(response.data.status === '200' || response.data.status === 200){
                defer.resolve(jsonFormatter.mapToFormat("SecurityStatusResponse",response.data.data.doors.values));
            }
            else {
                defer.reject({statusCode: 404,message: "Failure"});
            }
        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(err);
        });
    return defer.promise;
}

exports.getFuel = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getEnergyService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
            if(response.data.status === '200' || response.data.status === 200){
                if(!isNaN(response.data.data.tankLevel.value)){
                    defer.resolve(jsonFormatter.mapToFormat("FuelResponse",response.data.data));
                }
                else {
                    defer.reject({statusCode : 404, message: "Not Found"});
                }
            }
            else {
                defer.reject({statusCode: 404,message: "Failure"});
            }

        })
        .catch((err)=>{
            logger.error(err);
        });
    return defer.promise;
}

exports.getBattery = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getEnergyService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
            if(response.data.status === '200' || response.data.status === 200){
                if(!isNaN(response.data.data.batteryLevel.value)){
                    defer.resolve(jsonFormatter.mapToFormat("BatteryResponse",response.data.data));
                }
                else {
                    defer.reject({statusCode : 404, message: "Not Found"});
                }
            }
            else {
                defer.reject({statusCode: 404,message: "Failure"});
            }

        })
        .catch((err)=>{
            logger.error(err);
        });
    return defer.promise;
}

exports.triggerEngineAction = function (vehicleId,command) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/actionEngineService',{
        id : vehicleId,
        command: command,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
        })
        .catch((err)=>{
            logger.error(err);
        });
}

