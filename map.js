function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat:1.3521, lng: 103.8198 }
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("right-panel"));
  const control = document.getElementById("floating-panel");
  control.style.display = "block";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  calculateAndDisplayRoute(directionsService, directionsRenderer)
  const onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
  document.getElementById("mode").addEventListener("change", onChangeHandler);
}
5
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else { 
    alert("Geolocation is not supported by this browser.");
  } 
}

function getCords(position){
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
  
}

getLocation()

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  directionsService.route(
    {
      travelMode:selectedMode,
      origin:{lat: 1.3918268999999999,lng: 103.91028790000001},
      destination: {lat: 1.4067,lng: 103.9022},
      
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
