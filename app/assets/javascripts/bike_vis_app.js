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
  BikeVisApp.initialize();

  currentData();

  $('#station-select').on('change', function(){
    selectedStation = $('#station-select').val();
    tripPointData(selectedStation);
  });

});
