var map;
var myMarker;
var infoWindow;
var contentString;
function initMap() {
  console.log(myCampaigns);

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8566, lng: 2.3522},
    zoom: 12
  });


  myCampaigns.forEach((campaign) => {
    contentString = '<div>'+
    '<h1>'+campaign.name+'</h1>'+
    '<p>'+campaign.description+'</p>'+
    '</div>',

    console.log("DEBUG CONTENT STRING", contentString),

    infoWindow = new google.maps.InfoWindow({
      content: contentString
    }),

    myMarker = new google.maps.Marker({
      position: {
        lat: campaign.location.coordinates[0],
        lng: campaign.location.coordinates[1]
      },
      map: map,
      title: campaign.name,
      info: contentString
    }),

    google.maps.event.addListener(myMarker, 'click', function() {
      infoWindow.setContent(this.info);
      infoWindow.open(map, this);
    });
  });
}
