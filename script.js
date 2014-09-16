var data,
    response,
    httpRequest,
    trondheimsfjorden = [63.493641, 10.539794];
    map = L.map('map').setView(trondheimsfjorden, 11), 

L.tileLayer('http://{s}.tiles.mapbox.com/v3/kproj6.jgi4fhgo/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map);

//http request to get JSON
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 8 and older
  httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

// function to handle request
httpRequest.onreadystatechange = function(){
  if (httpRequest.readyState === 4) {
    console.log('the response is received');
    if (httpRequest.status === 200) {
      response = httpRequest.responseText;
      data = JSON.parse(response);
    } else {
      alert('There was a problem with the request.');
    }
  } else {
    console.log('server not ready for http request');
  }
};

//get json
httpRequest.open('GET', 'http://localhost:8080/salinity.json', false);

//send request
httpRequest.send(null);

//draw a circle funciton
var drawCircle = function (startPointX, startPointY, offsetX, offsetY) {
  var circle = L.circle([startPointX + (offsetX * 0.0001),
    startPointY + (offsetY * 0.0001)], 1, {
    color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);
}

// draw a lot of circles!
for (var i = 0; i < 500; i++) {
  drawCircle(trondheimsfjorden[0], trondheimsfjorden[1], data[i].x, data[i].y);
}
