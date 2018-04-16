import { Injectable,Input } from '@angular/core';

import {EXAMPLE_JSON_POLY} from '../shared/example-geojson-polygon';

import {DataproviderService} from '../services/dataprovider.service';

declare var L: any;
declare var omnivore : any;
var mapOverlay : any;
var map;

const defaultCoords: number[] = [52.381685,4.890248]
const defaultZoom: number = 8

/**
 * Helper class to create map and overlay different kind
 * of data.
 */
@Injectable()
export class MapService {

  selectedObject : string = "density";

  

  // @Input()
  // set mapData(data : string){
  //   this._mapData = data;
  //   this.loadGraduatedCircularMap();
  // }

  constructor(private _dataProviderService: DataproviderService) { }

  public plotBaicMap(){


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

   public loadGraduatedCircularMap(){
 
    //  console.log("csv data is" + this._dataProviderService );
     map = L.map('map').setView(defaultCoords, defaultZoom);
     map.maxZoom = 100;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var myStyle = {
       radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

      var customLayer = L.geoJson(null, {
          pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, myStyle);
        }
      });

      var gpxLayer = omnivore.csv.parse( this._dataProviderService.getCSV(),{
          // latfield: 'latitude',
          // lonfield: 'longitude',
          // delimiter: ','
      },customLayer );

      //zoom to layer
      map.fitBounds(gpxLayer.getBounds());

      // // var csvLayer = omnivore.csv.parse(this.mapData);
      map.addLayer(gpxLayer);
  
   }


}
