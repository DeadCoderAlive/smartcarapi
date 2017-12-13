var nock = require('nock');
var assert = require('assert');
var gmapi = require('../service/gmapi');
var expect = require('expect.js');
const gmapiUrl = "http://gmapi.azurewebsites.net";
const vehicleResponse = require('../resources/vehicleInfo.json');
const securityResponse = require('../resources/security.json');
var fuelResponse = require('../resources/fuel.json');
var engineResponse = require('../resources/engine.json');

nock(gmapiUrl)
    .post('/getVehicleInfoService', {
        "id": 1234, "responseType": "JSON"
    })
    .reply(200, vehicleResponse);

describe('getVehicleInfoService gmapi test', function () {
    it('it returns the expected vehicle response', function () {
        gmapi.getVehicleInfo(1234)
            .then((res) => {
                expect(res).to.eq(vehicleResponse.data)
            })
            .catch((err) => {

            });
    })
});

nock(gmapiUrl)
    .post('/getVehicleInfoService', {
        "id": 123, "responseType": "JSON"
    })
    .reply(200,
        {
            response: {
                data: {
                    status: 404,
                    reason: "Vehicle id 123 not found"
                }
            }
        }
    );

describe('getVehicleInfoService gmapi test', function () {
    it('it returns the expected no vehicle found for id response', function () {
        gmapi.getVehicleInfo(123)
            .then((res) => {
                expect(res).to.eq({statusCode: 404, message: "Vehicle id 123 not found"})
            })
            .catch((err) => {

            });
    })
});

nock(gmapiUrl)
    .post('/getSecurityStatusService', {
        "id": 1234, "responseType": "JSON"
    })
    .reply(200, securityResponse);

describe('getSecurityStatus gmapi test', function () {
    it('it returns the expected security response', function () {
        gmapi.getSecurityStatus(1234)
            .then((res) => {
                expect(res).to.eq(securityResponse.data)
            })
            .catch((err) => {

            });
    })
});


nock(gmapiUrl)
    .post('/getSecurityStatusService', {
        "id": 123, "responseType": "JSON"
    })
    .reply(200,
        {
            response: {
                data: {
                    status: 404,
                    reason: "Vehicle id 123 not found"
                }
            }
        }
    );

describe('getSecurityStatus gmapi test', function () {
    it('it returns the expected no vehicle for idresponse', function () {
        gmapi.getSecurityStatus(123)
            .then((res) => {
                expect(res).to.eq({statusCode: 404, message: "Vehicle id 123 not found"})
            })
            .catch((err) => {

            });
    })
});


nock(gmapiUrl)
    .post('/getEnergyService', {
        "id": 1234, "responseType": "JSON"
    })
    .reply(200, fuelResponse);

describe('getFuel gmapi test', function () {
    it('it returns the expected fuel response', function () {
        gmapi.getFuel(1234)
            .then((res) => {
                expect(res).to.eq(fuelResponse.data)
            })
            .catch((err) => {

            });
    })
});

nock(gmapiUrl)
    .post('/getEnergyService', {
        "id": 123, "responseType": "JSON"
    })
    .reply(200,
        {
            response: {
                data: {
                    status: 404,
                    reason: "Vehicle id 123 not found"
                }
            }
        }
    );

describe('getFuel gmapi test', function () {
    it('it returns the expected not found response', function () {
        gmapi.getFuel(123)
            .then((res) => {
                expect(res).to.eq({statusCode: 404, message: "Vehicle id 123 not found"})
            })
            .catch((err) => {

            });
    })
});

nock(gmapiUrl)
    .post('/actionEngineService', {
        "id": 1234, "responseType": "JSON", "command": "START_VEHICLE"
    })
    .reply(200, engineResponse);

describe('triggerEngine gmapi test', function () {
    it('it returns success or failure for the engine trigger', function () {
        gmapi.triggerEngineAction(1234, "START")
            .then((res) => {
                expect(res).to.eq(engineResponse.actionResult);
            })
            .catch((err) => {

            });
    })
})