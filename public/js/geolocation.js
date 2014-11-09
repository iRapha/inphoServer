//find user location
function findUserLocation() {
    var output = $("#out");

    if(!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation"
        + "is not supported by your browser</p>";

        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude + " " + longitude);
        output.val('Latitude is ' + latitude
        + ' degrees. <br> Longitude is ' + longitude
        + ' degrees.');

        getNearbyPages(longitude, latitude);
    }

    function error() {
    output.innerHTML = "Unable to retrieve your location";
    };

    navigator.geolocation.getCurrentPosition(success, error);
}

//gives nearby venues' pages
function getNearbyPages(lng, lat) {

    function processRequest() {
        if(httpRequest.readyState === 4) {
            //everything is good
            if (httpRequest.status === 200) {
                //EVEN BETTER!
                var result = JSON.parse(httpRequest.responseText);
                renderPages(result);
            } else {
                //nooooooo
                $("#loading-location-message").find('h2').text =
                    'Oops! We\'ve messed up!';
                $("#loading-location-message").find('h3').val(
                    'There was an error retrieving pages near you! :(');
            }

        }
    }
    var httpRequest;

    if (window.XMLHttpRequest) { //Mozilla, Safari, IE7+, Chrome ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { //IE6 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = processRequest;

    httpRequest.open('POST', 'http://localhost:3000/locations');
    httpRequest.setRequestHeader('Content-Type',
        'application/x-www-urlencoded');
    httpRequest.send('longitude='+lng+'&latitude='+lat);

}

function renderPages(result) {
    //Does something
    console.log(result);
}

findUserLocation();