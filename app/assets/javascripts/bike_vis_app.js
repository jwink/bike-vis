window.BikeVisApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

$(document).ready(function(){
  favorites = new BikeVisApp.Collections.Favorites();
  favorites.fetch();

  globalCurrentData = undefined;
  var inVis = $('.in-vis-span').data('vis');
  if (inVis != "in-vis") {
    if (inVis!="static") {
      currentData();
    }
  }

});

function close(div){
  $(div).css('display','none')
}

function populateStationInfo(whichStation, direction) {
  $.each(globalCurrentData, function(index, station) {
   if (station.id == whichStation) {
      currInfoObject = station;
    }
  });
  currStation = new StationModel(currInfoObject, direction);
  currStation.getHistory.call(currStation)();
  currStationNearby = new StationCollection();
  var stationsArr = []
  $.each(currStation.current.nearbyStations, function(index, nearby) {
    stationID = nearby.id;
    $.each(globalCurrentData, function(index, station) {
      if (station.id == stationID) {
        currInfoObject = station;
      }
    });
    nearStation = new StationModel(currInfoObject, direction);
    nearStation.getHistory.call(nearStation)();
    currStationNearby.models.push(nearStation);
  });
}
