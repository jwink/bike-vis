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
  //listView = new BikeVisApp.Views.FavoritesListView({collection: favorites, el: $('#favorites')});
  favorites.fetch();

  map1 = L.mapbox.map('map1', 'jeffwinkler.iolcgn8o')
    .setView([40.725, -73.979], 13);


  //map1 = L.mapbox.map('map1', 'jeffwinkler.ipa0jko0  ')
  //  .setView([40.725, -73.979], 13);


  globalCurrentData = undefined;
  //BikeVisApp.initialize();
  var inVis = $('.in-vis-span').data('vis');
  if (inVis != "in-vis") {
    currentData();
  }


  // $('#station-select').on('change', function() {
  //   wait = true;
  //   selectedStation = $('#station-select').val();
  //   populateStationInfo(selectedStation, "to");
  //   waiting = setInterval(function(){
  //     if (currStationNearby.models[4].history.length==24 && wait==true) {
  //       wait = false;
  //       findBestAlternative(currStation, currStationNearby);
  //     } else {
  //       console.log("waiting");
  //     }
  //   }, 1000);
  // });
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
