
function StationModel(data, direction) {
  this.current = data;
  this.direction = direction;
  this.history = {};
  this.staticInfo = {};
  this.currHour = getCurrHour();
  this.bikeForecast = [];
  this.dockForecast = [];
  this.bestAlternative = undefined;
}

function getCurrHour() {
  currTime = new Date();
  currHour = currTime.getHours();
  currMin = currTime.getMinutes();
  if (currMin > 30) {
    return currHour+1;
  } else {
    return currHour;
  }
};

StationModel.prototype.getHistory = function() {
  var that = this;
  return function(){
    var thys = that;
    $.ajax({
      url: '/averages/averageinfo',
      dataType: 'json',
      data: {station: thys.current.id},
      success: function(data) {
        data.sort(function(a, b){return a['hour']-b['hour']});
        thys.history = data;
        thys.getStaticInfo();
      }
    });
  }
}

StationModel.prototype.getStaticInfo = function() {
  var that = this
  $.ajax({
    url: '/stations/static',
    dataType: 'json',
    data: {station: this.current.id},
    success: function(data) {
      that.staticInfo = data;
      that.getForecast('bike');
      that.getForecast("dock");
    }
  });
}

StationModel.prototype.getForecast = function(bikeOrDock) {
  if (bikeOrDock == "bike") {
    var current = this.current.availableBikes;
    var averageLookup = "avail_bikes_avg";
  } else {
    var current = this.current.availableDocks;
    var averageLookup = "avail_docks_avg";
  }
  var forecast = [];
  var averageForCurrHour = this.history[this.currHour][averageLookup];
  for (i=0; i<4; i++) {
    var averageForNextHour = this.history[this.currHour+1+i][averageLookup];
    var chgRelativeToNow = averageForNextHour - averageForCurrHour;
    var forecastForNextHour = current + chgRelativeToNow;
    if (forecastForNextHour < 0) {
      forecast.push(0);
    } else if (forecastForNextHour > this.staticInfo.capacity) {
      forecast.push(this.staticInfo.capacity);
    } else {
      forecast.push(forecastForNextHour);
    }
  }
  if (bikeOrDock == "bike") {
    this.bikeForecast = forecast;
  } else {
    this.dockForecast = forecast;
  }
}

function findBestAlternative(tripStation, nearbyStations) {
  if (tripStation.direction == "from") {
    var whichForecast = 'bikeForecast';
  } else {
    var whichForecast = 'dockForecast'
  }
  currBest = nearbyStations.models[0];
  $.each(nearbyStations.models, function(index, station) {
    if (station[whichForecast][0] > currBest[whichForecast][0]) {
      currBest = station;
    }
  });
  tripStation.bestAlternative = currBest;
  clearInterval(waiting);
}


















