const gmapiUrl = " http://gmapi.azurewebsites.net";
const Q = require('q');
const axios = require('axios');
const logger = require('log4js');

axios.defaults.headers.post['Content-Type'] = 'application/json';

exports.getVehicleInfo = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getVehicleInfoService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
        })
        .catch((err)=>{
            logger.error(err);
        });
}

exports.getSecurityStatus = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getSecurityStatusService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
        })
        .catch((err)=>{
            logger.error(err);
        });
}

exports.getEnergy = function (vehicleId) {
    let defer = Q.defer();
    axios.post(gmapiUrl+'/getEnergyService',{
        id : vehicleId,
        responseType: "JSON"
    })
        .then((response)=>{
            logger.debug(response);
        })
        .catch((err)=>{
            logger.error(err);
        });
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