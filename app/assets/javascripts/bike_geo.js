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

    map1.on('click', onMapClick);

});