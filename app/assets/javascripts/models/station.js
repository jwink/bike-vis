
function StationModel(data) {
  this.current = data;
  this.history = {};
}

StationModel.prototype.getHistory = function() {
  var that = this;
  $.ajax({
    url: '/averages/averageinfo',
    dataType: 'json',
    data: {station: this.current.id},
    success: function(data) {
      data.sort(function(a, b){return a['hour']-b['hour']});
      console.log(data);
      that.history = data;
    }
  });
}


