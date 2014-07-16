
$(function() {

  var inVis = $('.in-vis-span').data('vis');
  if (inVis == "in-vis") {
    getSaturations();
  }
  $('#start-stop-button').click(function() {
    if (startStop == "start") {
      startStop = "stop";
    } else {
      startStop = "start";
    }
  });

  $( "#slider-vertical" ).slider({
    orientation: "vertical",
    min: 0,
    max: 23,
    value: 8,
    animate: 'slow',
    slide: function(event, ui) {
      console.log(23-ui.value);
      counter = 23-ui.value;
      runVis("fromSlider");
    }
  });





});

counter = 0;
startStop = "stop";

function getSaturations() {
  $.ajax({
    url: '/saturations/vis',
    dataType: 'json',
    success: function(data) {
      globalSaturations = data;
      runVis("firstRun");
      timeOutID = setInterval(function(){runVis("fromLoop");}, 750);
    }
  });
}


function runVis(whoseCalling) {
  if (startStop == "stop" && whoseCalling=="fromLoop") {
    return 0;
  }

  if (whoseCalling != "firstRun") {
    map1.removeLayer(stationGroup);
    map1.removeLayer(bikeGroup);
  }

  $('#slider-vertical').slider("value", 23-counter%24);

  actualHour = counter%12;
  if (actualHour == 0) {
    actualHour = 12;
  }

  if (counter%24 == counter%12) {
    amPm = "am";
  } else {
    amPm = "pm";
  }

  clock = actualHour + ":00" + amPm;

  $('#hour').html(clock);


  stationInfo = thisHour(counter%24);
  counter = counter + 1;
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
  stationGroup = L.featureGroup(layerInfo);
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

