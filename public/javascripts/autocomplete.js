
function initMap() {
    var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

  var input = document.getElementById('searchTextField');
  var options = {
    bounds: defaultBounds,
    types: ['establishment']
  };

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', fillInAddress);

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    $('#latitude').val(place.geometry.location.lat());
    $('#longitude').val(place.geometry.location.lng());
    console.log(place.geometry.location.lat());
  }

}
