var nock = require('nock');
var assert = require('assert');
var gmapi  =require('../service/gmapi');
var expect = require('expect.js');
const gmapiUrl = "http://gmapi.azurewebsites.net";
const vehicleResponse = require('../resources/vehicleInfo.json');

getVehicleInfoServiceMock = nock(gmapiUrl)
                                .post('/getVehicleInfoService',{
                                    "id" : 1234,  "responseType" : "JSON"
                                })
                                .reply(200,vehicleResponse);

describe('getVehicleInfoService gmapi test',function () {
    it('it returns the expected vehicle response',function () {
        gmapi.getVehicleInfo(1234)
            .then((res)=>{
            expect(res).to.eq(vehicleResponse.data)
            })
            .catch((err)=>{

            });
    })
});

     nock(gmapiUrl)
    .post('/getVehicleInfoService',{
        "id" : 123,  "responseType" : "JSON"
    })
    .reply(200,
        {response: {
            data : {
               status : 404,
               reason : "Vehicle id 123 not found"
                }
            }
        }
    );

describe('getVehicleInfoService gmapi test',function () {
    it('it returns the expected vehicle response',function () {
        gmapi.getVehicleInfo(123)
            .then((res)=>{
                expect(res).to.eq({statusCode : 404,message: "Vehicle id 123 not found"})
            })
            .catch((err)=>{

            });
    })
});
