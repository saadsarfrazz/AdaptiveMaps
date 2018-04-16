import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';


declare var L: any;
declare var randomColor : any;

//lib to overlay csv file
declare var omnivore : any;


@Component({
  selector: 'app-graduated-circular-map',
  templateUrl: './graduated-circular-map.component.html',
  styleUrls: ['./graduated-circular-map.component.css']
})
export class GraduatedCircularMapComponent extends BasicMapComponent implements OnInit {


  constructor(private _dataProviderService : DataproviderService) { 
                super();
              }

  ngOnInit() {
    console.log("Graduated Circular init");
    this.plotBaicMap();
    this.loadGraduatedCircularMap();
  }

  public loadGraduatedCircularMap(){
 

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
      this.map.fitBounds(gpxLayer.getBounds());

      // // var csvLayer = omnivore.csv.parse(this.mapData);
      this.map.addLayer(gpxLayer);
  
   }

  sizeOptionSelected(value){
    console.log("Size variable in GCMap is" + value);
  }

  colorOptionSelected(value){
    console.log("Color variable in GCMap is" + value);
  }

}
