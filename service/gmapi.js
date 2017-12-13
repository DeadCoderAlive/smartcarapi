const gmapiUrl = "http://gmapi.azurewebsites.net";
const Q = require('q');
const axios = require('axios');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
const jsonFormatter = require('../utils/formatter');
var _ = require('lodash');

axios.defaults.headers.post['Content-Type'] = 'application/json';

exports.getVehicleInfo = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getVehicleInfoService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
          if(isStatusOk200(response.data) && isValidVehicleResponse(response.data)){
              defer.resolve(jsonFormatter.mapToFormat("VehicleInfoResponse",isValidVehicleResponse(response.data)));
          }
          else {
              defer.reject({statusCode: response.data.status || 500,message: response.data.reason || "Failure"});
          }
        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(ISE);
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
            if(isStatusOk200(response.data) && isValidSecurityStatusResponse(response.data)){
                defer.resolve(jsonFormatter.mapToFormat("SecurityStatusResponse",isValidSecurityStatusResponse(response.data).doors.values));
            }
            else {
                defer.reject({statusCode: response.data.status || 500,message: response.data.reason || "Failure"});
            }
        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(ISE);
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
            if(isStatusOk200(response.data) && isValidFuelResponse(response.data)){
                    defer.resolve(jsonFormatter.mapToFormat("FuelResponse",isValidFuelResponse(response.data)));
            }
            else {
                defer.reject({statusCode: response.data.status || 500,message: response.data.reason || "Failure"});
            }

        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(ISE);
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
            if(isStatusOk200(response.data) && isValidBatteryResponse(response.data) && !isNaN(isValidBatteryResponse(response.data).batteryLevel.value)){
                defer.resolve(jsonFormatter.mapToFormat("BatteryResponse",isValidBatteryResponse(response.data)));
            }
            else {
                defer.reject({statusCode: 404,message: "Battery Levels could not be determined"});
            }

        })
        .catch((err)=>{
            logger.error(err);
            defer.reject(ISE);
        });
    return defer.promise;
}

exports.triggerEngineAction = function (vehicleId,command) {
    let defer = Q.defer();
    let commands ={
        'START' : 'START_VEHICLE',
        'STOP' : 'STOP_VEHICLE'
    };
    axios.post(gmapiUrl+'/actionEngineService',{
        id : vehicleId,
        command: commands[command],
        responseType: "JSON"
    })
        .then((response)=>{
            if(isStatusOk200(response.data)) {
                defer.resolve(jsonFormatter.mapToFormat("EngineActionResponse", response.data));
            }
            else {
                defer.reject({statusCode: response.data.status || 500,message: response.data.reason || "Failure"});
            }
        }).catch((err)=>{
            logger.error(err);
            defer.reject(ISE)
        });
    return defer.promise;
}

/****  Helpers  ****/

let ISE = {statusCode: 500, message: "Internal Server Error"};

var isValidBatteryResponse = function (response) {
    return getObject(response,"batteryLevel");
}

var isValidFuelResponse = function (response) {
    return getObject(response,"tankLevel");
}

var isValidSecurityStatusResponse = function (response) {
    return getObject(response,"doors");
}

var isValidVehicleResponse = function (response) {
 if(getObject(response,"vin") && getObject(response,"color") && getObject(response,"fourDoorSedan")
    && getObject(response,"twoDoorCoupe") && getObject(response,"driveTrain")) {
    return getObject(response,"vin");
 }
 return null;
}

function isStatusOk200(data){
    return data.status == 200 || data.status  == '200';
}

//recursively search for key in json
function getObject(theObject,key) {
    var result = null;
    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i],key);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(var prop in theObject) {
            console.log(prop + ': ' + theObject[prop]);
            if(prop == key && theObject[prop].value != "null") {
                return theObject;
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject(theObject[prop],key);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}