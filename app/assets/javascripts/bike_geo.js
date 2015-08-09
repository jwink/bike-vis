
fromStation = undefined;
fromStationNear = undefined;
toStation = undefined;
toStationNear = undefined;
favArray = [];
nonFavArray = [];

$(function(){
   $('.welcome').draggable(); //drag all the info menus*
  prevFromFillColor = undefined;
  prevFromFillOpacity = undefined;
  prevFromSource = undefined;
  prevToFillColor = undefined;
  prevToFillOpacity = undefined;
  prevToSource = undefined;
  prevFromAltFillColor = undefined;
  prevFromAltFillOpacity = undefined;
  prevFromAltMarker = undefined;
  prevToAltFillColor = undefined;
  prevToAltFillOpacity = undefined;
  prevToAltMarker = undefined;
  map1.on('zoomend', function() {
    var inVis = $('.in-vis-span').data('vis');
    if (inVis != "in-vis") {
      if (inVis!="static") {
        var mZoom = map1.getZoom();
        map1.eachLayer(function(marker) {
          if (marker.options != undefined) {
            if (marker.options.stroke != undefined) {
              marker.setRadius(8+5*(mZoom-13));
            }
          }
        });
      }
    }
  });
  map1.on('popupopen', function(e) {
    $('.pick-up-button').click(function() {
      close('.welcome');
      if (prevFromSource != undefined) {
        prevFromSource.setStyle({fillOpacity: prevFromFillOpacity, fillColor: prevFromFillColor});
      }
      wait = true;
      selectedStation = $('.pick-up-button').data('bike');
      populateStationInfo(selectedStation, "from");
      waiting = setInterval(function(){
        if (currStationNearby.models[4].history.length==24 && wait==true) {
          wait = false;
          findBestAlternative(currStation, currStationNearby);
          fromStation = currStation;
          fromStationNear = currStationNearby;
          populateFromEl();

          chageAltColor(fromStation.bestAlternative.current.id, "from");
        } else {
        }
      }, 1000);
      map1.closePopup();
      prevFromSource = e.popup._source;
      prevFromFillOpacity = e.popup._source.options.fillOpacity;
      prevFromFillColor = e.popup._source.options.fillColor;
      e.popup._source.setStyle({fillOpacity: 0.85, fillColor: '#00ff00'});
    });
    $('.drop-off-button').click(function() {
      close('.welcome');
      if (prevToSource != undefined) {
        prevToSource.setStyle({fillOpacity: prevToFillOpacity, fillColor: prevToFillColor});
      }
      wait = true;
      selectedStation = $('.pick-up-button').data('bike');
      populateStationInfo(selectedStation, "to");
      waiting = setInterval(function(){
        if (currStationNearby.models[4].history.length==24 && wait==true) {
          wait = false;
          findBestAlternative(currStation, currStationNearby);
          toStation = currStation;
          toStationNear = currStationNearby;
          populateToEl();

          chageAltColor(toStation.bestAlternative.current.id, "to");
        } else {
        }
      }, 1000);
      map1.closePopup();
      prevToSource = e.popup._source;
      prevToFillOpacity = e.popup._source.options.fillOpacity;
      prevToFillColor = e.popup._source.options.fillColor;
      e.popup._source.setStyle({fillOpacity: 0.85, fillColor: '#00ff00'});
    });
   $('.add-as-fav').click(function() {
     whichStation = $('.add-as-fav').data('bike');
     whichUser = $('.user-id-span').data('user');
     favorites.create({user_id: whichUser, station_id: whichStation});
     window.location.reload();
   });
   $('.drop-as-fav').click(function() {
     var thisFav = {};
     var whichStation = $('.drop-as-fav').data('bike');
     $.each(favorites.models, function(index, fav) {
       if (fav.attributes.citibike_id == whichStation) {
        thisFav = fav;
       }
     });
     thisFav.destroy();
     window.location.reload();
   });
  });
});


function populateMap(data) {
  var user = $('.user-id-span').data('user');
  var userFavorites = [];
  if (user != "no_user") {
    $.each(favorites.models, function(index, fav) {
      userFavorites.push(fav.attributes.citibike_id);
    });
  }
  $.each(data, function(index, station) {
    var latitude = station.latitude;
    var longitude = station.longitude;
    var label = station.label;
    var bikes = station.availableBikes;
    var docks = station.availableDocks;
    var saturation = (bikes/(bikes + docks));
    var $el = "<strong>"+label+"</strong>" + " &nbsp&nbsp&nbsp&nbspBikes: " + bikes + " Docks: " + docks +
              " </br><button data-bike=" + station.id +
              " class='pick-up-button'>Pick Up</button>" +
              " <button data-bike=" + station.id +
              " class='drop-off-button'>Drop Off</button>";
    if (user=='no_user') {
      if (label.indexOf("Coming soon:") > -1 || (bikes == 0 && docks == 0)) {
         var marker = L.circleMarker([latitude, longitude], {radius: 8,
                         color: '#000000',
                         fillColor: '#bcbcad',
                         opacity: 1,
                         stroke: true,
                         className: station.id.toString(),
                         fillOpacity: 0.8})
                     .bindPopup($el, {offset: [-12, 2]});
      nonFavArray.push(marker);

      } else {
      var marker = L.circleMarker([latitude, longitude], {radius: 8,
                         color: '#000000',
                         fillColor: '#0000ff',
                         opacity: 1,
                         stroke: true,
                         className: station.id.toString(),
                         fillOpacity: saturation})
                     .bindPopup($el, {offset: [-12, 2]});
      nonFavArray.push(marker);
      }
    } else {
      if ($.inArray(station.id, userFavorites) != -1) {
        $el += " <button data-bike=" + station.id +
               " class='drop-as-fav'>Drop As Fav</button>";
          var marker = L.circleMarker([latitude, longitude], {radius: 8,
                         color: '#000000',
                         fillColor: '#ff00ff',
                         opacity: 1,
                         stroke: true,
                         className: station.id.toString(),
                         fillOpacity: (saturation+0.2)})
                     .bindPopup($el, {offset: [-12, 2]});
        favArray.push(marker);
      } else {
        $el += " <button data-bike=" + station.id +
               " class='add-as-fav'>Add As Fav</button>";
          var marker = L.circleMarker([latitude, longitude], {radius: 8,
                         color: '#000000',
                         fillColor: '#0000ff',
                         opacity: 1,
                         stroke: true,
                         className: station.id.toString(),
                         fillOpacity: saturation})
                     .bindPopup($el, {offset: [-12, 2]});
        nonFavArray.push(marker);
      }
    }
  });
  nonFavStations = L.featureGroup(nonFavArray);
  if (user=='no_user') {
    var overlayMaps = {
      "All Stations": nonFavStations
    }
  } else {
    favStations = L.featureGroup(favArray);
    var overlayMaps = {
      "Favorites": favStations,
      "Others": nonFavStations
    }
    map1.addLayer(favStations);
    L.control.layers(null, overlayMaps).addTo(map1);
  }
  map1.addLayer(nonFavStations);
}

function chageAltColor(id, direction) {
  map1.eachLayer(function(marker) {
    if (marker.options != undefined) {
      if (marker.options.stroke != undefined) {
        if (parseInt(marker.options.className) == id) {
          currAlt = marker;
        }
      }
    }
  });
  if (direction == "from") {
    if (prevFromAltMarker != undefined) {
      prevFromAltMarker.setStyle({fillColor: prevFromAltFillColor, fillOpacity: prevFromAltFillOpacity});
    }
    prevFromAltFillColor = currAlt.options.fillColor;
    prevFromAltFillOpacity = currAlt.options.fillOpacity;
    prevFromAltMarker = currAlt;
    currAlt.setStyle({fillColor: '#ffff00', fillOpacity: 0.85});
  } else {
    if (prevToAltMarker != undefined) {
      prevToAltMarker.setStyle({fillColor: prevToAltFillColor, fillOpacity: prevToAltFillOpacity});
    }
    prevToAltFillColor = currAlt.options.fillColor;
    prevToAltFillOpacity = currAlt.options.fillOpacity;
    prevToAltMarker = currAlt;
    currAlt.setStyle({fillColor: '#ffff00', fillOpacity: 0.85});
  }
}







