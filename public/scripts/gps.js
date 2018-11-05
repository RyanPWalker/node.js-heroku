/************************
* GPS Browser API
************************/

function getLocation() {
    var x = document.getElementById("latitude");
    var y = document.getElementById("longitude");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        $("#status").html("<strong style='color:red'>Geolocation is not supported by this browser.</strong>");
    }
}

function showPosition(position) {
    x.value = position.coords.latitude;
    y.value = position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#status").html("<strong style='color:red'>Geolocation was blocked by your browser</strong>");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#status").html("<strong style='color:red'>Location information is unavailable.</strong>");
            break;
        case error.TIMEOUT:
            $("#status").html("<strong style='color:red'>The request to get user location timed out.</strong>");
            break;
        case error.UNKNOWN_ERROR:
            $("#status").html("<strong style='color:red'>An unknown error occurred.</strong>");
            break;
    }
}