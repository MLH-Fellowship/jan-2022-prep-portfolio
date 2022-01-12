
var map = L.map('map').setView([51.505, -0.09], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);


var fellows = [
    {
    	x:51.5,
    	y:-0.09,
    	pic:'aaron.jpg'
    },
    {
    	x:41.5,
    	y:19,
    	pic:'swift.jpg'
    },
];

for(var i=0;i<fellows.length;i++){
    var icon = L.icon({
        iconUrl: '/assets/img/'+fellows[i].pic,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [22, 72], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var popup = "" //customize this
    var marker = L.marker([fellows[i].x, fellows[i].y],{icon:icon}).addTo(map);
    marker.bindPopup(popup);
}
