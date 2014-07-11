
function StationModel(data, direction) {
  this.current = data;
  this.direction = direction;
  this.history = {};
  this.staticInfo = {};
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

StationModel.prototype.getStaticInfo = function() {
  var that = this
  $.ajax({
    url: '/stations/static',
    dataType: 'json',
    data: {station: this.current.id},
    success: function(data) {
      console.log(data);
      that.staticInfo = data;
    }
  });
}

