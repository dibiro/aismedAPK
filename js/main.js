var directionsDisplay;
var map;
var hospital_actual="";
var lat = 10.1579312;
var latint = 10.1579312;
var lng = -67.9972104;
var lngint = -67.9972104;
var first_time = true;
var change_position = false;
var getmapa = true;

function get_mapa() {
  if (getmapa) {
    
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC9JC1dTG8NTS-awf4WCvA6hXaNE0qtwC0', function(data, textStatus) {
      /*optional stuff to do after getScript */ 
      getmapa = false;
      function getLocation() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          }
      }
      function showPosition(position)
      {
          latint = position.coords.latitude;
          lngint = position.coords.longitude;
          lat = position.coords.latitude;
          lng = position.coords.longitude; 
      }
      getLocation();
    });
  }
}

get_mapa();

function initMap() {
  // Create a map object and specify the DOM element for display.
  
  directionsDisplay = new google.maps.DirectionsRenderer({
      map: map = new google.maps.Map(document.getElementById('Mapa'), {
            center: {lat: lat, lng: lng},
            scrollwheel: false,
            zoom: 17
          })
    });
}


function recargal() {
  // body...
  if (getmapa) {
    $("#Mapa").html("<h1>No se ha establecido conexion</h1>");
    get_mapa();
  }else {
    if (first_time) {
      setTimeout(function() {
        initMap();
      }, 500);
      first_time = false;
    }
    if (change_position) {
      change_position = false;

        // Set destination, origin and travel mode.
        var request = {
          destination: {lat: lat, lng: lng},
          origin: {lat: latint, lng: lngint},
          travelMode: google.maps.TravelMode.DRIVING
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
        //var marker = new google.maps.Marker({
        //  map: map,
        //  position: {lat: lat, lng: lng},
        //  title: hospital_actual
        //});
    }  
  }
}
$('a[href="#antemapa"]').on('click', function(e) {
  recargal();
});

$(window).resize(function() {
  $("#Mapa").css("width", $( window ).width()).css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());
  $("#Confi").css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());
  $("#ambulancia").css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());
});
$("#Mapa").css("width", $( window ).width()).css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());
$("#Confi").css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());
$("#ambulancia").css("height", $( window ).height()-$("#cabezera").height()-$("#tabscabezera").height());


$('.modal-trigger').leanModal();
$('select').material_select();