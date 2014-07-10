


// new model for a tripPoint...ie either from or to
//  fetches the relevant historic data from averages

function tripPointData(station) {
  $.ajax({
    url: '/averages/averageinfo',
    dataType: 'json',
    data: {station: station},
    success: function(data) {
      console.log("here");
      console.log(data);
    }
  });
}
