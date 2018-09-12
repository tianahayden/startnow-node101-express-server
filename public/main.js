
// FUNCTION FOR LOADING DATA TABLE AND CALLING GOOGLE MAPS FUNCTION
$(document).ready(function() {
// write your code here
    
    $.getJSON("data.json", function(data){
        $.each(data, function(i, item){
            var latitude = item.location[0];
            var longitude = item.location[1];
            var mapsLink = "https://www.google.com/maps?q=" + latitude + "," + longitude;
            $("#table").append("<tr><td>" + item.name + "</td>" + "<td>" + item.description + "</td>" + "<td>" + '<a class="btn" href="https://www.google.com/maps?q=' + latitude + ',' + longitude + '" target="_blank">Get Directions</a>');
        })
        
    });

    google.maps.event.addDomListener(window, 'load', initMap());

});



// FUNCTION FOR GOOGLE MAPS MARKERS AND TOOLTIPS
function initMap() {
    var sanDiego = {lat: 32.714388, lng: -117.161458};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: sanDiego});
    

    $.getJSON("data.json", function(data){
        $.each(data, function(i, item){
            var latitude = item.location[0];
            var longitude = item.location[1];
            var eachItem = {lat: latitude, lng: longitude};
            var marker = new google.maps.Marker({
                position: eachItem,
                map: map,
                title: item.name
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + item.name + '</h1>' +
                '<div id="bodyContent">' + item.description + '</p>' + 
                '<a class="btn" href="https://www.google.com/maps?q=' + latitude + ',' + longitude + '" target="_blank">Get Directions</a>'
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
              });
        });
     },
)};











// NOTES FOR LATER
// ---------------------
// For setting directiosn request from - https://developers.google.com/maps/documentation/javascript/directions
//  var directionsRequest =
//  {
//     origin: pos,
//     destination: eachItem,
//     travelMode: 'DRIVING'
//   }



// ---------------------
// TESTING FXN FOR FINDING DISTANCE
// function distance(lat1, lon1, lat2, lon2) {
//     var p = 0.017453292519943295;    // Math.PI / 180
//     var c = Math.cos;
//     var a = 0.5 - c((lat2 - lat1) * p)/2 + 
//             c(lat1 * p) * c(lat2 * p) * 
//             (1 - c((lon2 - lon1) * p))/2;
  
//     return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
//   }
  
//   window.navigator.geolocation.getCurrentPosition(function(pos) {
//     console.log(pos); 
//     console.log("Distance in m: " +
//       distance(pos.coords.longitude, pos.coords.latitude, 32.714388, -117.161458)
//     ); 
//   });


// ----------------------
// CONSOLE LOG FOR CURRENT LOCATION from https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       console.log(pos);

//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } 
// else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
// }