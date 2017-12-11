

exports.mapToFormat = function (model,data) {
    switch(model){
        case "VehicleInfoResponse":
            return mapToVehicleInfoResponse(data);
        case "SecurityStatusResponse":
            return mapToSecurityStatusResponse(data);
        case "FuelResponse":
            return mapToFuelResponse(data);
        case "BatteryResponse":
            return mapToBatteryResponse(data);
        case "EngineActionResponse":
            return mapToEngineActionResponse(data);
        default:
            break;
    }
}

const mapToVehicleInfoResponse = function(data){
  var formatted = {
      vin : data.vin.value || "",
      color : data.color.value || "",
      doorCount : data.fourDoorSedan.value == true ? 4 : data.twoDoorCoupe.value == true ? 2 : 4,
      driveTrain : data.driveTrain.value || ""
  }
  return formatted;
}

const mapToSecurityStatusResponse = function(data){
    var formatted = [];
    for(var i=0;i<data.length;i++){
        var fdoor = {
            location : data[i].location.value,
            locked : data[i].locked.value
        }
        if(data[i].locked.value == "True"){
            formatted.push(fdoor);
        }
    }
    return formatted;
}

const mapToFuelResponse = function (data) {
    var formatted = {
        percent : data.tankLevel.value
    };
    return formatted;
}

const mapToBatteryResponse = function (data) {
    var formatted = {
        percent : data.batteryLevel.value
    };
    return formatted;
}

const mapToEngineActionResponse = function (data) {
    var statuses = {
        'EXECUTED' : 'success',
        'FAILED' : 'failure'
    };
    var formatted = {
        status : statuses[data.actionResult.status]
    };
    return formatted;
}
