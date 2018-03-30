import { Injectable } from '@angular/core';

declare var L: any;

const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8

@Injectable()
export class MapService {

  constructor() { }

  public plotMap(){
    console.log("Plotting map");

    var myStyle = {
      "color": "#3949AB",
      "weight": 5,
      "opacity": 0.95
    };

    var map = L.map('map').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

    // var customLayer = L.geoJson(null, {
    //   style: myStyle
    // });

    // var gpxLayer = omnivore.gpx(SAVED_ACTIVITIES.slice(0).find(run => run.id == id).gpxData, null, customLayer)
    // .on('ready', function() {
    //   map.fitBounds(gpxLayer.getBounds());
    // }).addTo(map);
  
  }


}
