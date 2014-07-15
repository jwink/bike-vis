


function currentData() {
  $.ajax({
    url: '/currents/nowinfo',
    dataType: 'json',
    success: function(data) {
      var currentData = $.parseJSON(data);
      stationDisplay(currentData);
    }
  });
}


function stationDisplay(data) {
  globalCurrentData = data;
  populateMap(data);
}
