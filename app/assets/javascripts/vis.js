
$(function() {

  var inVis = $('.in-vis-span').data('vis');
  if (inVis == "in-vis") {
    getSaturations();
  }

});

counter = 0;
startStop = "stop";

function getSaturations() {
  $.ajax({
    url: '/saturations/vis',
    dataType: 'json',
    success: function(data) {
      globalSaturations = data;
      timeOutID = setInterval(runVis, 750);
      //runVis();

    }
  });

  $('#start-stop-button').click(function() {
    if (startStop == "start") {
      startStop = "stop";
    } else {
      startStop = "start";
    }
  });
}


function runVis() {
  if (startStop == "stop") {
    return 0;
  }

  if (counter > 0) {
    map1.removeLayer(stationGroup);
    map1.removeLayer(bikeGroup);
  }
  $('#hour').html(counter%24);


  stationInfo = thisHour(counter%24);
  counter = counter + 1;
  if (counter == 24) {
    //clearInterval(timeOutID);
  }
  layerInfo = [];
  bikesArray = [];
  usedBikes = 0;
  $.each(stationInfo, function(index, station) {
    var marker = L.circleMarker([station.latitude, station.longitude], {radius: (station.saturation * 20),
                         color: '#000000',
                         fillColor: getFillColor(station.quadrant),
                         opacity: 1,
                         stroke: true,
                         fillOpacity: getOpacity(station.quadsatur)});
    layerInfo.push(marker);
    usedBikes = usedBikes + station.avg_bikes;
  });
  var bikesInUse = L.circleMarker([40.741551, -73.989634], {radius: (4639-usedBikes)/20.0,
                         color: '#000000',
                         fillColor: '#ffffff',
                         opacity: 1,
                         stroke: true,
                         fillOpacity: 0.75});
  bikesArray.push(bikesInUse);
  bikeGroup = L.featureGroup(bikesArray);
  stationGroup = L.featureGroup(layerInfo)
  map1.addLayer(stationGroup);
  map1.addLayer(bikeGroup);
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





function what() {
  map1.eachLayer(function(marker) {
    if (marker.options != undefined) {
      if (marker.options.stroke != undefined) {
        console.log(marker.options.className);
      }
    }
    //console.log(marker.options);
  });
}

