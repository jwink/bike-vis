// var do_on_load = function() {

//   var inVis = $('.in-vis-span').data('vis');
//   if (inVis == "static") {
//     getStatic();
//   }

//   map1 = L.mapbox.map('map1', 'jeffwinkler.iolcgn8o')
//     .setView([40.725, -73.979], 13);

//   if (inVis == "in-vis") {
//     getSaturations();
//   }
//   $('#start-stop-button').click(function() {
//     if (startStop == "start") {
//       startStop = "stop";
//     } else {
//       startStop = "start";
//     }
//   });
//   $( "#slider-vertical" ).slider({
//     orientation: "vertical",
//     min: 0,
//     max: 23,
//     value: 8,
//     animate: 'slow',
//     slide: function(event, ui) {
//       console.log(23-ui.value);
//       counter = 23-ui.value;
//       runVis("fromSlider");
//     }
//   });

//   showHide();

//   $('#signup-link').on('click', function() {
//     $('#login-div').hide();
//     $('#signup-div').dialog();
//     return false;
//   });

//   $('#login-link').on('click', function() {
//     $('#login-div').dialog();
//     $('#signup-div').hide();
//     return false;
//   });

//   $('#logout-link').on('click', function() {
//     logOut();
//     return false;
//   });

//   prevFromFillColor = undefined;
//   prevFromFillOpacity = undefined;
//   prevFromSource = undefined;
//   prevToFillColor = undefined;
//   prevToFillOpacity = undefined;
//   prevToSource = undefined;
//   prevFromAltFillColor = undefined;
//   prevFromAltFillOpacity = undefined;
//   prevFromAltMarker = undefined;
//   prevToAltFillColor = undefined;
//   prevToAltFillOpacity = undefined;
//   prevToAltMarker = undefined;
//   map1.on('zoomend', function() {
//     var inVis = $('.in-vis-span').data('vis');
//     if (inVis != "in-vis") {
//       if (inVis!="static") {
//         var mZoom = map1.getZoom();
//         map1.eachLayer(function(marker) {
//           if (marker.options != undefined) {
//             if (marker.options.stroke != undefined) {
//               marker.setRadius(8+5*(mZoom-13));
//             }
//           }
//         });
//       }
//     }
//   });
//   map1.on('popupopen', function(e) {
//     $('.pick-up-button').click(function() {
//       close('.welcome');
//       if (prevFromSource != undefined) {
//         prevFromSource.setStyle({fillOpacity: prevFromFillOpacity, fillColor: prevFromFillColor});
//       }
//       wait = true;
//       selectedStation = $('.pick-up-button').data('bike');
//       populateStationInfo(selectedStation, "from");
//       waiting = setInterval(function(){
//         if (currStationNearby.models[4].history.length==24 && wait==true) {
//           wait = false;
//           findBestAlternative(currStation, currStationNearby);
//           fromStation = currStation;
//           fromStationNear = currStationNearby;
//           populateFromEl();

//           chageAltColor(fromStation.bestAlternative.current.id, "from");
//         } else {
//         }
//       }, 1000);
//       map1.closePopup();
//       prevFromSource = e.popup._source;
//       prevFromFillOpacity = e.popup._source.options.fillOpacity;
//       prevFromFillColor = e.popup._source.options.fillColor;
//       e.popup._source.setStyle({fillOpacity: 0.85, fillColor: '#00ff00'});
//     });
//     $('.drop-off-button').click(function() {
//       close('.welcome');
//       if (prevToSource != undefined) {
//         prevToSource.setStyle({fillOpacity: prevToFillOpacity, fillColor: prevToFillColor});
//       }
//       wait = true;
//       selectedStation = $('.pick-up-button').data('bike');
//       populateStationInfo(selectedStation, "to");
//       waiting = setInterval(function(){
//         if (currStationNearby.models[4].history.length==24 && wait==true) {
//           wait = false;
//           findBestAlternative(currStation, currStationNearby);
//           toStation = currStation;
//           toStationNear = currStationNearby;
//           populateToEl();

//           chageAltColor(toStation.bestAlternative.current.id, "to");
//         } else {
//         }
//       }, 1000);
//       map1.closePopup();
//       prevToSource = e.popup._source;
//       prevToFillOpacity = e.popup._source.options.fillOpacity;
//       prevToFillColor = e.popup._source.options.fillColor;
//       e.popup._source.setStyle({fillOpacity: 0.85, fillColor: '#00ff00'});
//     });
//    $('.add-as-fav').click(function() {
//      whichStation = $('.add-as-fav').data('bike');
//      whichUser = $('.user-id-span').data('user');
//      favorites.create({user_id: whichUser, station_id: whichStation});
//      window.location.reload();
//    });
//    $('.drop-as-fav').click(function() {
//      var thisFav = {};
//      var whichStation = $('.drop-as-fav').data('bike');
//      $.each(favorites.models, function(index, fav) {
//        if (fav.attributes.citibike_id == whichStation) {
//         thisFav = fav;
//        }
//      });
//      thisFav.destroy();
//      window.location.reload();
//    });
//   });
//   favorites = new BikeVisApp.Collections.Favorites();
//   favorites.fetch();

//   globalCurrentData = undefined;

//   var inVis = $('.in-vis-span').data('vis');
//   if (inVis != "in-vis") {
//     if (inVis!="static") {
//       currentData();
//     }
//   }
// }

// function showHide() {
//   var status = $('.user-id-span').data("user");
//   if (status == 'no_user') {
//     $('#logout-link').hide();
//   } else {
//     $('#login-link').hide();
//     $('#signup-link').hide();
//     $('#fb').hide();
//     $('#twit').hide();

//   }
// }

// function logOut() {
//   $.ajax({
//     url: '/sessions',
//     method: 'delete',
//     dataType: 'json',
//     success: function() {
//       console.log('hello');
//       window.location.reload();
//     }
//   });
//   $('#logout-link').hide();
//   $('#login-link').show();
//   $('#signup-link').show();
// }

// $(do_on_load);

// $(window).bind('page:load', do_on_load);
