

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
  return {
      vin : data.vin.value || "",
      color : data.color.value || "",
      doorCount : data.fourDoorSedan.value == true ? 4 : data.twoDoorCoupe.value == true ? 2 : 4,
      driveTrain : data.driveTrain.value || ""
  };
}

const mapToSecurityStatusResponse = function(data){
    let formatted = [];
    for(let i=0;i<data.length;i++){
        let fdoor = {
            location : data[i].location.value,
            locked : data[i].locked.value
        };
        if (data[i].locked.value != "True") {
        } else {
            formatted.push(fdoor);
        }
    }
    return formatted;
}

const mapToFuelResponse = function (data) {
 return {
        percent : data.tankLevel.value
    };
}

const mapToBatteryResponse = function (data) {
   return {
        percent : data.batteryLevel.value
    };
}

const mapToEngineActionResponse = function (data) {
    let statuses = {
        'EXECUTED' : 'success',
        'FAILED' : 'failure'
    };
    return {
        status : statuses[data.actionResult.status]
    };
}
