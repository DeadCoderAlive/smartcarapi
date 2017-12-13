var assert = require('assert');
var rewire = require('rewire'),
    gmapi = rewire('../service/gmapi');
var expect = require('expect.js');
var vehicleResponse = require('../resources/vehicleInfo.json');
var securityResponse = require('../resources/security.json');
var fuelResponse = require('../resources/fuel.json');
var enginResponse = require('../resources/engine.json');

//private method tests
describe('getObjectTest',function () {
   it('should return the object of the level with key',function () {
      var getObject = gmapi.__get__('getObject');
      expect(getObject(vehicleResponse,"vin")).to.be.an("object");
   });
});

describe('is200OkTest',function () {
    it('should return 200 if data object status is 200',function () {
        var isStatusOk200 = gmapi.__get__('isStatusOk200');
        expect(isStatusOk200({status : 200})).to.be(true);
    })
})

describe('isValidVehicleResponseTest',function () {
    it('should return the vehcile response object',function () {
        var isValidVehicleResponse = gmapi.__get__('isValidVehicleResponse');
        expect(isValidVehicleResponse(vehicleResponse)).to.be(vehicleResponse.data);
    });
});

describe('isValidSecurityStatusResponse',function () {
    it('should return the security response object',function () {
        var isValidSecurityStatusResponse = gmapi.__get__('isValidSecurityStatusResponse');
        expect(isValidSecurityStatusResponse(securityResponse)).to.be(securityResponse.data);
    });
});

describe('isValidSecurityStatusResponse',function () {
    it('should return the security response object',function () {
        var isValidSecurityStatusResponse = gmapi.__get__('isValidSecurityStatusResponse');
        expect(isValidSecurityStatusResponse(securityResponse)).to.be(securityResponse.data);
    });
});

describe('isValidFuelResponse',function () {
    it('should return the security response object',function () {
        var isValidFuelResponse = gmapi.__get__('isValidFuelResponse');
        expect(isValidFuelResponse(fuelResponse)).to.be(fuelResponse.data);
    });
});

describe('isValidBatteryResponse',function () {
    it('should return the security response object',function () {
        var isValidBatteryResponse = gmapi.__get__('isValidBatteryResponse');
        expect(isValidBatteryResponse(fuelResponse)).to.be(fuelResponse.data);
    });
});