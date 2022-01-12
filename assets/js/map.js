var map = L.map('map').setView([51.505, -0.09], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

var fellows = [
    {
    	lat:51.5,
    	long:-0.09,
    	pic:'aaron.jpg',
        name: 'Aaron',
        location: 'XYZ',
        github: '/',
        linkedin: '/'
    },
    {
    	lat:41.5,
    	long:19,
    	pic:'swift.jpg',
        name: 'Swift',
        location: 'New York',
        github: '/',
        linkedin: '/'
    },
];

function distance(Fellow1,Fellow2) {
    lat1=Fellow1.lat,lat2=Fellow2.lat, lon1=Fellow1.long, lon2=Fellow2.long
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
             + Math.cos(lat1) * Math.cos(lat2)
             * Math.pow(Math.sin(dlon / 2),2);
    let c = 2 * Math.asin(Math.sqrt(a));
    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;
    // calculate the result
    return(c * r);
}

for(var i=0;i<fellows.length;i++){
    var nearestIndex=-1,nearestDistance=Number.MAX_SAFE_INTEGER;
    for(var j=0;j<fellows.length;j++){
        if(i==j) continue;
        console.log(distance(fellows[i],fellows[j]));
        if(distance(fellows[i],fellows[j])<nearestDistance){
            nearestDistance=distance(fellows[i],fellows[j]);
            nearestIndex=j;
        }
    }
    fellows[i].neighbour=fellows[nearestIndex].name
}

for(var i=0;i<fellows.length;i++){
    var icon = L.icon({
        iconUrl: '/assets/img/'+fellows[i].pic,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [22, 72], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var popup = `<div class="container">
                <h4><b>${fellows[i].name}</b></h4>
                <b>${fellows[i].location}</b>
                <br><b>Nearest to ${fellows[i].neighbour}!</b>
                <div >
                <a href=${fellows[i].linkedin}><em class="fab fa-linkedin"></em></a>
                <a href=${fellows[i].github}><em class="fab fa-github"></em></a>
                </div>
                </div>`
    var marker = L.marker([fellows[i].lat, fellows[i].long],{icon:icon}).addTo(map);
    marker.bindPopup(popup);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // On success..Get current cordinates.
            positionCords = {"lat": position.coords.latitude, "lng": position.coords.longitude};
            var circle = L.circle([position.coords.latitude,position.coords.longitude], {
                color: 'black',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 200000
            }).addTo(map);
            circle.bindPopup("You are here!").openPopup();
            //var YourPosition = L.marker([position.coords.latitude,position.coords.longitude]).addTo(map);
        },
        function(error) {
            // On error code..Do nothing
        },
        {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
    );
}  