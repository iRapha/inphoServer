var map;
var marker;
function initializeMap() {
    var mapOptions = {
        "center": new google.maps.LatLng(0.000, 0.000),
        "zoom": 2
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
        if(marker) {
            marker.setMap(null);
        }
        marker = new google.maps.Marker({position: event.latLng, map: map});
        $("#latitude-input").val(event.latLng.k);
        $("#longitude-input").val(event.latLng.B);
        console.log(event.latLng.k);
    });
}
google.maps.event.addDomListener(window, "load", initializeMap);
