$(function(){
function geo(){
  console.log('geo is here')
}

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map1);
    }

    //map1.on('click', onMapClick);


});


function populateMap(data) {
  console.log(data[0]);
  $.each(data, function(index, station) {
    var latitude = station.latitude;
    var longitude = station.longitude;
    var label = station.label;
    var bikes = station.availableBikes;
    var docks = station.availableDocks;
    var $el = label + " <button data-bike=" + station.id + " class='pick-up-button'>Pick Up</button>" + " <button data-bike=" + station.id + " class='drop-off-button'>Drop Off</button>"
    var greenIcon = L.icon({
      iconUrl: 'http://api.tiles.mapbox.com/mapbox.js/v1.6.3/images/marker-icon-2x.png',
      //shadowUrl: 'http://api.tiles.mapbox.com/mapbox.js/v1.6.3/images/marker-shadow.png',
      iconSize:     [10, 10], // size of the icon
      //shadowSize:   [5, 5], // size of the shadow
      iconAnchor:   [2, 2], // point of the icon which will correspond to marker's location
      //shadowAnchor: [4, 4],  // the same for the shadow
      popupAnchor:  [-8, 0] // point from which the popup should open relative to the iconAnchor
    });
    marker = L.marker([latitude, longitude], {icon: greenIcon})
            .addTo(map1)
            .bindPopup($el);
  });
 
  map1.on('popupopen', function() {  

  $('.pick-up-button').click(function() {
      console.log("hello");
    });

});

}
