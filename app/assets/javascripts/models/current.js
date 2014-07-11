


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
  var $select = $('#station-select');
  $.each(data, function(index, station) {
    $select.append('<option value=' + station.id + '>' + station.label + '</option>');
  });
}
