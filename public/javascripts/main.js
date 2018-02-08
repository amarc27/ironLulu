var map;
var myMarker;
function initMap() {
  console.log(myCampaigns);

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8566, lng: 2.3522},
    zoom: 12
  });
  myCampaigns.forEach((campaign) => {
    myMarker = new google.maps.Marker({
      position: {
        lat: campaign.location.coordinates[0],
        lng: campaign.location.coordinates[1]
      },
      map: map,
      title: "I'm here"
    })
  });
}
