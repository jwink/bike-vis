
function StationModel(data, direction) {
  this.current = data;
  this.direction = direction;
  this.history = {};
  this.staticInfo = {};
  this.currHour = getCurrHour();
  this.bikeForecast = [];
  this.dockForecast = [];
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
  $.ajax({
    url: '/averages/averageinfo',
    dataType: 'json',
    data: {station: this.current.id},
    success: function(data) {
      data.sort(function(a, b){return a['hour']-b['hour']});
      console.log(data);
      that.history = data;
      that.getForecast('bike');
      that.getForecast("dock");
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

StationModel.prototype.getForecast = function(bikeOrDock) {
  if (bikeOrDock == "bike") {
    current = this.current.availableBikes;
    averageLookup = "avail_bikes_avg";
  } else {
    current = this.current.availableDocks;
    averageLookup = "avail_docks_avg";
  }
  forecast = [];
  averageForCurrHour = this.history[this.currHour][averageLookup];
  for (i=0; i<4; i++) {
    averageForNextHour = this.history[this.currHour+1+i][averageLookup];
    chgRelativeToNow = averageForNextHour - averageForCurrHour;
    forecastForNextHour = current + chgRelativeToNow;
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





















