function initMap() {
var directionsRenderer = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 7,
  center: {lat: 36.16, lng: -86.78}
});
directionsRenderer.setMap(map);
directionsRenderer.setPanel(document.getElementById('right-panel'));

var control = document.getElementById('floating-panel');
control.style.display = 'block';
map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

var onChangeHandler = function() {
  calculateAndRoute(directionsService, directionsRenderer);
};
document.getElementById('starting').addEventListener('change', onChangeHandler);
document.getElementById('ending').addEventListener('change', onChangeHandler);
}

function calculateAndRoute(directionsService, directionsRenderer) {
var start = document.getElementById('starting').value;
var end = document.getElementById('ending').value;
directionsService.route({
  origin: start,
  destination: end,
  travelMode: 'DRIVING'
}, function(response, status) {
  if (status === 'OK') {
    directionsRenderer.setDirections(response);
  } else {
    window.alert('Request failed ' + status);
  }
});
}

function toggleDirPanel() {
    if(document.getElementById('panel-open').style.display == 'none') {
        document.getElementById('panel-open').style.display = 'block';
        document.getElementById('panel-closed').style.display = 'none';
        document.getElementById('right-panel').style.display = 'block';
    } else {
        document.getElementById('panel-closed').style.display = 'block';
        document.getElementById('panel-open').style.display = 'none';
        document.getElementById('right-panel').style.display = 'none';
    }
}