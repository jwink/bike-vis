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


  BikeVisApp.initialize();

  currentData();

  favorites = new BikeVisApp.Collections.Favorites();

  favorites.fetch()


  $('#station-select').on('change', function(){
    selectedStation = $('#station-select').val();
    $.each(globalCurrentData, function(index, station) {
      if (station.id == selectedStation) {
        currInfoObject = station;
      }
    });
    currStation = new StationModel(currInfoObject);
    currStation.getHistory();
    //tripPointData(selectedStation);
  });

});
