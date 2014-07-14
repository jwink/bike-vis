
$(function() {

  var inVis = $('.in-vis-span').data('vis');
  if (inVis == "in-vis") {
    getSaturations();
  }

});

counter = 0;

function getSaturations() {
  $.ajax({
    url: '/saturations/vis',
    dataType: 'json',
    success: function(data) {
      globalSaturations = data;
      timeOutID = setInterval(runVis, 1000);
      //runVis();

    }
  });
}


function runVis() {
  if (counter > 0) {
    map1.removeLayer(stationGroup);
  }
  $('#hour').html(counter);
  stationInfo = thisHour(counter);
  counter = counter + 1;
  if (counter == 24) {
    clearInterval(timeOutID);
  }
  layerInfo = []
  $.each(stationInfo, function(index, station) {
  var marker = L.circleMarker([station.latitude, station.longitude], {radius: (station.saturation * 20),
                         color: '#000000',
                         fillColor: getFillColor(station.quadrant),
                         opacity: 1,
                         stroke: true,
                         fillOpacity: getOpacity(station.quadsatur)});
    layerInfo.push(marker);
  });
  stationGroup = L.featureGroup(layerInfo);
  map1.addLayer(stationGroup);
}

function thisHour(hour) {
  hourArray = []
  $.each(globalSaturations, function(index, timeStation) {
    if (timeStation.hour == hour) {
      hourArray.push(timeStation);
    }
  });
  console.log(hourArray);
  return hourArray;
}


function getOpacity(quadSaturation) {
  return (quadSaturation - .05) * 1.4;

}

function getFillColor(quad) {
  switch(quad) {
    case "se":
      return '#0000ff';
      break;
    case "ne":
      return '#00ffff';
      break;
    case "nw":
      return '#00ff00'
      break;
    case "sw":
      return '#ff00ff';
      break;
    default:
      return '#ffff00';
      break;

  }

}




