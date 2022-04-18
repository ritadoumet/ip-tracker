let ipElt = document.getElementById("ipInput");
let ipAddr = document.getElementById("ipAddr");
let loc = document.getElementById("loc");
let timezone = document.getElementById("timezone");
let isp = document.getElementById("isp");
let infoSection = document.getElementById("infoSection");
let mapDiv = document.getElementById("map");
let anim = document.querySelector(".lds-circle");

let map = L.map('map');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2V2ZXRpaDg2MSIsImEiOiJja2h4MzFxaG8wOW5pMzBsdGZ1NXFoeHh5In0.hw5mLyF4KWalDgcxAWrmuw'
}).addTo(map);

let marker = L.marker([51.5, -0.09]);

var form = document.getElementsByTagName("form")[0];
function submitInput(event) { 
    event.preventDefault(); 
    let ipInput = ipElt.value;
    if (validateIPaddress(ipInput)){
        ipInput = fixIP(ipInput);
        console.log(ipInput);
        getURL(ipInput)
    }
} 
form.addEventListener('submit', submitInput);

function getURL(ipaddr){
    let url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_sPdtqgOhSN6ClPqf4FVuYRtcjD3Yp";
        fetch(url+'&ipAddress=' + ipaddr).
        then(data => {return data.json()})
        .then(data => 
            {
                updateInfo(data);
                updateMap(data)
            })
}
function validateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    alert("You have entered an invalid IP address!")  
    ipElt.value="";
    return (false)  
  }  

function updateInfo(data){
    console.log(data);
    ipAddr.innerHTML=data.ip;
    loc.innerHTML=/*data.location.city+", "+ */data.location.region+", "+data.location.postalCode+"HI";
    timezone.innerHTML=data.location.timezone;
    isp.innerHTML=data.isp;
}

function updateMap(data){
    var blackIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize:     [38, 50], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
    });
    map.setView([data.location.lat, data.location.lng], 13);
    marker = L.marker([data.location.lat, data.location.lng], {icon: blackIcon}).addTo(map);
}

function fixIP(ipInput){
    const arr = ipInput.split(".");
    let fixedIP = "";
    for (i = 0; i<4; i++){
        nb = parseInt(arr[i]);
        if (i==0)
          fixedIP = fixedIP+nb;
        else
            fixedIP = fixedIP+"."+nb;
    }
    return fixedIP;
}
$.getJSON("https://api.ipify.org?format=json", function(data) {
    getURL(data.ip);
    infoSection.style.display="flex";
    mapDiv.style.display="block";
    anim.style.display="none";
})