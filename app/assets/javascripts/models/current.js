


function currentData() {
  $.ajax({
    url: '/currents/nowinfo',
    dataType: 'json',
    success: function(data) {
      var currentData = $.parseJSON(data);
      //var whichStation = 72;
      //$.each(jobj, function(index, station) {
      //  if (station.id == whichStation) {
      //    console.log(station.id, station.availableBikes);
      //  }
      //});
      stationDisplay(currentData);
    }
  });
}


function stationDisplay(data) {
  var $select = $('#station-select');
  $.each(data, function(index, station) {
    $select.append('<option value=' + station.id + '>' + station.label + '</option>');
  });
}
