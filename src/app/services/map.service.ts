import { Injectable } from '@angular/core';

import {EXAMPLE_JSON_POLY} from '../shared/example-geojson-polygon';

declare var L: any;
var mapOverlay : any;
var map;

const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8

@Injectable()
export class MapService {

  selectedObject : string = "density";


  constructor() { }

  public plotMap(){


    // var myStyle = {
    //   "color": "#3949AB",
    //   "weight": 5,
    //   "opacity": 0.95
    // };

  map = L.map('map').setView(defaultCoords, defaultZoom);

  // let getColor = function(d : any) {
  //   return d > 1000 ? '#800026' :
  //          d > 500  ? '#BD0026' :
  //          d > 200  ? '#E31A1C' :
  //          d > 100  ? '#FC4E2A' :
  //          d > 50   ? '#FD8D3C' :
  //          d > 20   ? '#FEB24C' :
  //          d > 10   ? '#FED976' :
  //                     '#FFEDA0';
  // } 

  // var selectedObject ={
    
  // } 

  // let customstyle = function (feature : any) {
  //   console.log( "Arguments size : " + arguments.length);
  //   console.log( "Global selected object : " + this.selectedAttribute);
  //   return {
  //       fillColor: this.getColor(feature.properties.density),
  //       weight: 2,
  //       opacity: 1,
  //       color: 'white',
  //       dashArray: '3',
  //       fillOpacity: 0.7
  //   };
  // }

   

  // var finalfunction = customstyle.bind(someobject);

    map.maxZoom = 100;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

    var customstyle = this.customStyle;
    // var finalStyle = customstyle.bind(selectedObject);

    // L.geoJson(EXAMPLE_JSON_POLY).addTo(map);
     mapOverlay = L.geoJson(EXAMPLE_JSON_POLY, {
                    style : customstyle
                          });
          
    //zoom to layer
    map.fitBounds(mapOverlay.getBounds());

    map.addLayer(mapOverlay);
    

    // var customLayer = L.geoJson(null, {
    //   style: myStyle
    // });

    // var gpxLayer = omnivore.gpx(SAVED_ACTIVITIES.slice(0).find(run => run.id == id).gpxData, null, customLayer)
    // .on('ready', function() {
    //   map.fitBounds(gpxLayer.getBounds());
    // }).addTo(map);
  
  }
  
  public customStyle = (feature : any) : any => {
    // var self = this;
    var selectedAttribute = this.selectedObject;
    return {
        fillColor: this.getColor(feature.properties[selectedAttribute]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }


  getColor = (d : number) : string => {
  return d > 1000 ? '#800026' :
          d > 500  ? '#BD0026' :
          d > 200  ? '#E31A1C' :
          d > 100  ? '#FC4E2A' :
          d > 50   ? '#FD8D3C' :
          d > 20   ? '#FEB24C' :
          d > 10   ? '#FED976' :
                    '#FFEDA0';
  }

   public updateMap(attributeName : string){
     console.log("map service update map" + attributeName );
     console.log("mapOverlay"+ mapOverlay);
      //update feature to be displayed 
      // this.selectedObject = attributeName; 
      //reset style
      var myStyle = {
       fillColor : "",
      "color": "#3949AB",
      "weight": 5,
      "opacity": 0.95
      };
      map.removeLayer(mapOverlay);

      this.selectedObject = attributeName;
      var customstyle = this.customStyle;
      mapOverlay = L.geoJson(EXAMPLE_JSON_POLY, {
                    style : customstyle
                          });
          
      //zoom to layer
      map.fitBounds(mapOverlay.getBounds());

      map.addLayer(mapOverlay);
      
      

   }


}
