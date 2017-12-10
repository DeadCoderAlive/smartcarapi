

exports.mapToFormat = function (model,data) {
    switch(model){
        case "VehicleInfoResponse":
            return mapToVehicleInfoResponse(data);
            break;
        default:
            break;
    }
}

var mapToVehicleInfoResponse = function(data){
  var formatted = {
      vin : data.vin.value || "",
      color : data.color.value || "",
      doorCount : data.fourDoorSedan.value == true ? 4 : data.twoDoorCoupe.value == true ? 2 : 4,
      driveTrain : data.driveTrain.value || ""
  }
  return formatted;
}