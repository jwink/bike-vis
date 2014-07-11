window.BikeVisApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //alert('Hello from Backbone!');
  }
};




$(document).ready(function(){

  map1 = L.mapbox.map('map1', 'jeffwinkler.ili3io27')
    .setView([40.745, -73.979], 12);

  globalCurrentData = undefined;

  BikeVisApp.initialize();

  currentData();

  favorites = new BikeVisApp.Collections.Favorites();

  favorites.fetch();

  $('#station-select').on('change', function() {
    selectedStation = $('#station-select').val();
    populateStationInfo(selectedStation, "from");
    //fromStation = currStation;
    //fromStationNear = currStationNearby;
  });



  // $('#station-select').on('change', function(){
  //   selectedStation = $('#station-select').val();
  //   $.each(globalCurrentData, function(index, station) {
  //     if (station.id == selectedStation) {
  //       currInfoObject = station;
  //     }
  //   });
  //   currStation = new StationModel(currInfoObject, "from");
  //   currStation.getHistory();
  //   currStation.getStaticInfo();

  //   currStationNearby = new StationCollection();
  //   $.each(currStation.current.nearbyStations, function(index, nearby) {
  //     stationID = nearby.id;
  //     $.each(globalCurrentData, function(index, station) {
  //       if (station.id == stationID) {
  //         currInfoObject = station;
  //       }
  //     });
  //     nearStation = new StationModel(currInfoObject);
  //     nearStation.getHistory();
  //     nearStation.getStaticInfo();
  //     currStationNearby.models.push(nearStation);
  //   });


  // });

});

function populateStationInfo(whichStation, direction) {

  $.each(globalCurrentData, function(index, station) {
   if (station.id == whichStation) {
      currInfoObject = station;
    }
  });
  currStation = new StationModel(currInfoObject, direction);
  currStation.getStaticInfo();
  currStation.getHistory();

  currStationNearby = new StationCollection();
  $.each(currStation.current.nearbyStations, function(index, nearby) {
    stationID = nearby.id;
    $.each(globalCurrentData, function(index, station) {
      if (station.id == stationID) {
        currInfoObject = station;
      }
    });
    nearStation = new StationModel(currInfoObject, direction);
    nearStation.getStaticInfo();
    nearStation.getHistory();

    currStationNearby.models.push(nearStation);
  });
}
