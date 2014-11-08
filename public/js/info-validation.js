// validate submit form on selectlocation
function validateMapsForm() {
    var lat = $("#latitude-input").val();
    var lng = $("#longitude-input").val();
    var rds = $("#radius-input").val();
    if(!lat || Number(lat) === NaN) {
        alert("Please input a valid Latitude")
        return false;
    } else if(!lng || Number(lng) === NaN) {
        alert("Please input a valid Longitude")
        return false;
    } else if(!rds || Number(rds) === NaN) {
        alert("Please input a valid Radius")
        return false;
    } else if(rds <= 1) {
        alert("Please input a valid Radius that's > 1 meter")
        return false;
    }
}

function validateBizInfo() {
    var lat = $("#latitude-input").val();
    var lng = $("#longitude-input").val();
    var rds = $("#radius-input").val();
    var name = $("#name-input").val();
    var html = $("#html-input").val();
    var pageColor = $("#page-color-input").val();
    var fontColor = $("#font-color-input").val();

    if(!lat || Number(lat) === NaN) {
        alert("Please input a valid Latitude");
        return false;
    } else if(!lng || Number(lng) === NaN) {
        alert("Please input a valid Longitude");
        return false;
    } else if(!rds || Number(rds) === NaN) {
        alert("Please input a valid Radius");
        return false;
    } else if(rds <= 1) {
        alert("Please input a valid Radius that's > 1 meter");
        return false;
    } else if(!name) {
        alert("Please input a Name for your business");
        return false;
    } else if(!html) {
        alert("Please input what to display to your customers");
        return false;
    } else if(!pageColor) {
        alert("Please select a background color");
        return false;
    } else if(!fontColor) {
        alert("Please select a font color");
        return false;
    }
}


// making the smartphone viewport change on input changes.
$("#name-input").on("input", function() {
    $("#smartphone-page-name").text($(this).val());
});

$("#html-input").on("input", function() {
    $("#smartphone-content").html($(this).val());
});

$("#font-color-input").on("change", function() {
    $("#smartphone-navbar").css("color", $(this).val());
});

$("#page-color-input").on("change", function() {
    $("#smartphone-navbar").css("background-color", $(this).val());
});
