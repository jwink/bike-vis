window.BikeVisApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

$(document).ready(function(){

  map1 = L.mapbox.map('map1', 'jeffwinkler.ili3io27')
    .setView([40.745, -73.979], 14);

  globalCurrentData = undefined;
  BikeVisApp.initialize();
  currentData();
  favorites = new BikeVisApp.Collections.Favorites();
  listView = new BikeVisApp.Views.FavoritesListView({collection: favorites, el: $('#favorites')});
  favorites.fetch();

  $('#station-select').on('change', function() {
    wait = true;
    selectedStation = $('#station-select').val();
    populateStationInfo(selectedStation, "to");
    waiting = setInterval(function(){
      if (currStationNearby.models[4].history.length==24 && wait==true) {
        wait = false;
        findBestAlternative(currStation, currStationNearby);
      } else {
        console.log("waiting");
      }
    }, 1000);
  });
});

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
