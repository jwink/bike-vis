$(function(){

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
        map1.closePopup();
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
      map1.closePopup();
    });

   $('.add-as-fav').click(function() {
     whichStation = $('.add-as-fav').data('bike');
     whichUser = $('.user-id-span').data('user');
     favorites.create({user_id: whichUser, station_id: whichStation});
     window.location.reload();
   });

   $('.drop-as-fav').click(function() {
     var thisFav = {};
     //  add logic to delete a fav on server side
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

    // var popup = L.popup();

    // function onMapClick(e) {
    //   popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(map1);
    // }

    // //map1.on('click', onMapClick);
});

fromStation = undefined;
fromStationNear = undefined;
toStation = undefined;
toStationNear = undefined;

favArray = [];
nonFavArray = [];

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
    var $el = "<strong>"+label+"</strong>" + " &nbsp&nbsp&nbsp&nbspBikes: " + bikes + " Docks: " + docks +
              " </br><button data-bike=" + station.id +
              " class='pick-up-button'>Pick Up</button>" +
              " <button data-bike=" + station.id +
              " class='drop-off-button'>Drop Off</button>";

    if (user=='no_user') {
      var marker = L.marker([latitude, longitude], {icon: nonFavIcon})
              .bindPopup($el);
      nonFavArray.push(marker);
    } else {
      if ($.inArray(station.id, userFavorites) != -1) {
        $el += " <button data-bike=" + station.id +
               " class='drop-as-fav'>Drop As Fav</button>";
        var marker = L.marker([latitude, longitude], {icon: favIcon})
              .bindPopup($el);
        favArray.push(marker);
      } else {
        $el += " <button data-bike=" + station.id +
               " class='add-as-fav'>Add As Fav</button>";
        var marker = L.marker([latitude, longitude], {icon: nonFavIcon})
              .bindPopup($el);
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
  }

  map1.addLayer(nonFavStations);

  L.control.layers(null, overlayMaps).addTo(map1);

}