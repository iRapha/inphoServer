//find user location
function findUserLocation() {
    if(!navigator.geolocation) {
        $("#loading-location-message").find('h2').text('Oops.');
        $("#loading-location-message").find('h3').text('Geolocation is not supported in your browser...');

        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $("#loading-location-message").find('h2').text('Please wait');
        $("#loading-location-message").find('h3').text('while we fetch pages near you.');

        console.log("["+longitude+", "+latitude+"]");

        getNearbyPages(longitude, latitude);
    }

    function error() {
        $("#loading-location-message").find('h2').text('Oops. We messed up!');
        $("#loading-location-message").find('h3').text("Unable to retrieve your location");
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
                $("#loading-location-message").find('h2').text('Oops! We\'ve messed up!');
                $("#loading-location-message").find('h3').text('There was an error retrieving pages near you! :( ');
                console.log(httpRequest.responseText);
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

    httpRequest.open('POST', 'www.inphoapp.com/locations');
    httpRequest.open('POST', '/locations'); // DEBUG ONLY
    httpRequest.setRequestHeader('Content-Type', 'text/json');
    httpRequest.send('{\"longitude\":'+lng+', \"latitude\":'+lat+"}");
}

function renderPages(result) {
    if(!result) {
        $("#loading-location-message").find('h2').text('Oops. We messed up!');
        $("#loading-location-message").find('h3').text('Something went wrong while fetching the pages near you...');
    } else if(result.err) {
        $("#loading-location-message").find('h2').text('Oops. We messed up!');
        $("#loading-location-message").find('h3').text(err);
    }

    if(result.inRadius.length < 1) {
        if(result.otherNearby >= 1) {
            $("#loading-location-message").find('h2').text("We can't place you in a specific location...");
            $("#loading-location-message").find('h3').text("These are some of the businesses near you.");

            for(var i = 0; i < result.otherNearby.legth; i++) {
                var page = result.otherNearby[i];
                $("#page-list").append("<div class='col-md-12' id='page-item"+i+"' style='width:100%; color:"+page.pageContent.fontColor+"; background-color:"+page.pageContent.pageColor+";'></div>");
                $("#page-item"+i).append("<h1>"+page.name+"</h1>");
            }
        } else {
            $("#loading-location-message").find('h2').text("We couldn't find any pages nearby...");
            $("#loading-location-message").find('h3').text("Why don't you ask the businesses around you to join INPHO? :)");
        }
    } else if(result.inRadius.length === 1) {
        $("#loading-location-message").find('h2').text("");
        $("#loading-location-message").find('h3').text("");

        var page = result.inRadius[0];
        $("#page-list").append("<div class='col-md-12' id='page-item0' style='width:100%; color:"+page.pageContent.fontColor+"; background-color:"+page.pageContent.pageColor+";'></div>");
        $("#page-item0").append("<h1>"+page.name+"</h1><div class\"col-md-12\" id=\"page-item0-body\" style=\"width:100%; color:#525252; background-color:#f0f0f0; padding: 10px 20px 10px 20px;\"></div>");
        $("#page-item0-body").append(page.pageContent.html);
    } else {
        $("#loading-location-message").find('h2').text("Looks like you could be in a lot of places...");
        $("#loading-location-message").find('h3').text("Are you in one of these?");

        for(var i = 0; i < result.inRadius.length; i++) {
            var page = result.inRadius[i];
            $("#page-list").append("<div class='col-md-12' id='page-item"+i+"' style='width:100%; color:"+page.pageContent.fontColor+"; background-color:"+page.pageContent.pageColor+";'></div>");
            $("#page-item"+i).append("<h1>"+page.name+"</h1>");
        }
    }
}

findUserLocation();
