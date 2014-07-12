$(function(){

favIcon = L.divIcon({
  className: 'fav-icon',
  iconSize: [10,10],
  iconAnchor: [2,2],
  popupAnchor: [-8,0]
});

nonFavIcon = L.divIcon({
  className: 'non-fav-icon',
  iconSize: [10,10],
  iconAnchor: [2,2],
  popupAnchor: [-8,0]
});

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map1);
    }

    //map1.on('click', onMapClick);
});

fromStation = undefined;
fromStationNear = undefined;
toStation = undefined;
toStationNear = undefined;

favArray = [];
nonFavArray = [];

function populateMap(data) {
  user = $('.user-id-span').data('user');
  $.each(data, function(index, station) {
    var latitude = station.latitude;
    var longitude = station.longitude;
    var label = station.label;
    var bikes = station.availableBikes;
    var docks = station.availableDocks;
    var $el = "<strong>"+label+"</strong>" + " &nbsp&nbsp&nbsp&nbspBikes: " + bikes + " Docks: " + docks +
              " </br><button data-bike=" + station.id +
              " class='pick-up-button'>Pick Up</button>" +
              " <button data-bike=" + station.id +
              " class='drop-off-button'>Drop Off</button>";



    //$el += " <button>Yo</button>"

    if (user=='no_user') {
      var marker = L.marker([latitude, longitude], {icon: nonFavIcon})
              .bindPopup($el);
      nonFavArray.push(marker);
    } else {
      //  test if station id in favorites, if so add to favarray,
      //  else to non fav
      //  also add either add or remove fav button depending
    }
  });

  nonFavStations = L.featureGroup(nonFavArray);

  if (user=='no_user') {
    var overlayMaps = {
      "All Stations": nonFavStations
    }
  } else {
    var overlayMaps = {

    }
  }

  map1.addLayer(nonFavStations);

  L.control.layers(null, overlayMaps).addTo(map1);

  map1.on('popupopen', function() {
    $('.pick-up-button').click(function() {
        console.log($('.pick-up-button').data('bike'), "pickup");
        wait = true;
        selectedStation = $('.pick-up-button').data('bike');
        populateStationInfo(selectedStation, "from");
        waiting = setInterval(function(){
          if (currStationNearby.models[4].history.length==24 && wait==true) {
            wait = false;
            findBestAlternative(currStation, currStationNearby);
            fromStation = currStation;
            fromStationNear = currStationNearby;
          } else {
            console.log("waiting");
          }
        }, 1000);
    });

    $('.drop-off-button').click(function() {
      console.log($('.drop-off-button').data('bike'), "dropoff");
      wait = true;
      selectedStation = $('.pick-up-button').data('bike');
      populateStationInfo(selectedStation, "to");
      waiting = setInterval(function(){
        if (currStationNearby.models[4].history.length==24 && wait==true) {
          wait = false;
          findBestAlternative(currStation, currStationNearby);
          toStation = currStation;
          toStationNear = currStationNearby;
        } else {
          console.log("waiting");
        }
      }, 1000);
    });
  });
}
