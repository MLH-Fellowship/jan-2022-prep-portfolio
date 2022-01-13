var map = L.map('map').setView([17.6078,8.0817], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 2,
}).addTo(map);

var fellows = [
    // {
    //  lat:51.5,
    //  long:-0.09,
    //  pic:'aaron.jpg',
    //     name: 'Aaron',
    //     location: 'XYZ',
    //     github: '/',
    //     linkedin: '/',
    //     role: 'Fellow',
    // },
    {
        lat:-14.2350,
        long:-51.9253,
        pic:'gabriel.jpg',
        name: 'Gabriel Cruz',
        location: 'Brazil',
        github: 'https://github.com/gmelodie',
        linkedin: 'https://www.linkedin.com/in/gabriel-de-melo-cruz/',
        role: 'Pod Leader',
    },
    {
        lat:42.4215,
        long:-75.6972,
        pic:'Kish.jpeg',
        name: 'Kish',
        location: 'Ottawa, Canada',
        github: 'http://github.com/kishdubey',
        linkedin: 'http://linkedin.com/in/kishdubey',
        role: 'Fellow',
    },
    {
        lat:34.0151,
        long:71.5249,
        pic:'nomani.jpg',
        name: 'Khudadad Nomani',
        location: 'Peshawar, Pakistan',
        github: 'https://github.com/KhudaDad414',
        linkedin: '/',
        role: 'Fellow',
    },
    {
        lat:19.3150,
        long:84.7941,
        pic:'pritish.jpeg',
        name: 'Pritish Samal',
        location: 'Berhampur, India',
        github: 'https://github.com/CIPHERTron',
        linkedin: 'https://linkedin.com/in/pritishsamal',
        role: 'Fellow',
    },
    {
        lat:13.0827,
        long:80.2707,
        pic:'vaibhave.jpg',
        name: 'Vaibhave S',
        location: 'Chennai, India',
        github: 'https://github.com/VaibhaveS',
        linkedin: 'https://www.linkedin.com/in/s-vaibhave-davey-a8798118b/',
        role: 'Fellow',
    },
    {
        lat:28.6139,
        long:77.2090,
        pic:'tushar.png',
        name: 'Tushar Malik',
        location: 'New Delhi, India',
        github: 'https://github.com/ditsuke',
        linkedin: '/',
        role: 'Fellow',
    },
    {
        lat:-33.8688,
        long:151.2093,
        pic:'yan.jpg',
        name: 'Yijun Yan',
        location: 'Sydney, Australia',
        github: 'https://github.com/yyjlincoln',
        linkedin: '/',
        role: 'Fellow',
    },
    {
        lat:28.7041,
        long:77.1025,
        pic:'riya.png',
        name: 'Riya Dev Varshney',
        location: 'Delhi, India',
        github: 'https://github.com/Riyadevvarshney11',
        linkedin: 'https://www.linkedin.com/in/riya-dev-varshney-361304197/',
        role: 'Fellow',
    },
    {
        lat:28.4595,
        long:77.0266,
        pic:'harsh.png',
        name: 'Harsh Sharma',
        location: 'Gurgaon, India',
        github: 'https://github.com/harshsharma6401',
        linkedin: 'http://linkedin.com/in/harsh-sharma-486a38211',
        role: 'Fellow',
    },
    {
        lat:19.0760,
        long:72.8777,
        pic:'dhruv.jpg',
        name: 'Dhruv Sachdev',
        location: 'Mumbai, India',
        github: 'https://github.com/Dhruv-Sachdev1313',
        linkedin: 'https://www.linkedin.com/in/dhruv-sachdev-19b1b3143/',
        role: 'Fellow',
    },
    {
        lat:23.5204,
        long:87.3119,
        pic:'pal.jpg',
        name: 'Aniket Pal',
        location: 'Durgapur, India',
        github: 'https://github.com/Aniket762',
        linkedin: 'https://www.linkedin.com/in/aniket-pal/',
        role: 'Fellow',
    },
    {
        lat:28.6139,
        long:77.2090,
        pic:'anubhav.jpg',
        name: 'Anubhav Gupta',
        location: 'New Delhi, India',
        github: 'https://github.com/anubhav06',
        linkedin: 'https://www.linkedin.com/in/anubhav-gupta06/',
        role: 'Fellow',
    },
    {
        lat:16.7488,
        long:78.0035,
        pic:'Sahithi.jpeg',
        name: 'P.Sahithi Reddy',
        location: 'Mahabubnagar, India',
        github: 'https://github.com/psahithireddy',
        linkedin: 'https://www.linkedin.com/in/sahithi-reddy-perkampally-b054220/',
        role: 'Fellow',
    },
    {
        lat:31.6340,
        long:74.8723,
        pic:'advitiay.jpg',
        name: 'Advitiay Anand',
        location: 'Amritsar, India',
        github: 'https://github.com/adizcode',
        linkedin: 'https://www.linkedin.com/in/advitiay-anand',
        role: 'Fellow',
    },
    {
        lat:19.0330,
        long:73.0297,
        pic:'kshitij.jpg',
        name: 'Kshitij Darekar',
        location: 'Navi Mumbai, India',
        github: 'https://github.com/KshitijDarekar',
        linkedin: 'https://www.linkedin.com/in/kshitij-darekar/',
        role: 'Fellow',
    },
    {
        lat:42.2181,
        long: -70.9410,
        pic:'emeka.jpg',
        name: 'Emeka',
        location: 'Weymouth, United States',
        github: 'https://github.com/Chukwuemeka-Mba',
        linkedin: '/',
        role: 'Fellow',
    },
    {
        lat:28.6139391,
        long: 77.2090212,
        pic:'tushar.png',
        name: 'tushar',
        location: 'New Delhi, India',
        github: 'https://github.com/ditsuke',
        linkedin: 'https://www.linkedin.com/in/mtushar00/',
        role: 'Fellow',
    },
];

function median(Fellows){
    var lat=0.0,long=0.0
    for(var i=0;i<Fellows.length;i++){
        lat+=Fellows[i].lat;
        long+=Fellows[i].long;
    }
    lat/=Fellows.length;
    long/=Fellows.length;
    return [lat,long];
}

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
        iconSize: [50, 50], // size of the icon
        // iconAnchor: [22, 94],
        popupAnchor:  [0, -16], // point from which the popup should open relative to the iconAnchor
        className: 'marker'
    });
    var popup = `<div class="container">
                <h4 style='display:inline'><b>${fellows[i].name}</b><h6 style='display:inline'>, ${fellows[i].role}</h6></h4>
                <hr/><b>${fellows[i].location}</b>
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

Medobj=median(fellows);

var icon = L.icon({
        iconUrl: '/assets/img/tea.jpeg',
        iconSize:     [40, 40], // size of the icon
        popupAnchor:  [0, -16], // point from which the popup should open relative to the iconAnchor
        className: 'marker'
});
var popup = `<div class="container">
            <h6 style='display:inline'><b>They call me median ;)</b><h7 style='display:inline'>, A perfect place to hangout!</h7></h6>
            <hr/><b>Oman</b>
            </div>`
var marker = L.marker([Medobj[0], Medobj[1]],{icon:icon}).addTo(map);
marker.bindPopup(popup);