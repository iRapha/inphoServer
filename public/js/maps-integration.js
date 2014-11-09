var map;
var marker;
var circle;
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
        if(circle) {
            circle.setMap(null);
        }
        marker = new google.maps.Marker({position: event.latLng, map: map});
        $("#latitude-input").val(event.latLng.k);
        $("#longitude-input").val(event.latLng.B);

        var radius = Number($("#radius-input").val());

        if(radius > 1) {
            circle = new google.maps.Circle(
                {
                    "clickable": false,
                    "strokeColor": '#FF0000',
                    "strokeOpacity": 0.8,
                    "strokeWeight": 2,
                    "fillColor": '#FF0000',
                    "fillOpacity": 0.35,
                    "center": event.latLng,
                    "map": map,
                    "radius": radius
                }
            );
        }
    });

    $("#radius-input").on("change", function() {
        if(circle) {
            circle.setMap(null);
        }

        var radius = Number($(this).val());

        if(radius > 1 && marker) {
            circle = new google.maps.Circle(
                {
                    "clickable": false,
                    "strokeColor": '#FF0000',
                    "strokeOpacity": 0.8,
                    "strokeWeight": 2,
                    "fillColor": '#FF0000',
                    "fillOpacity": 0.35,
                    "center": marker.getPosition(),
                    "map": map,
                    "radius": radius
                }
            );
        }
    })

}
google.maps.event.addDomListener(window, "load", initializeMap);
