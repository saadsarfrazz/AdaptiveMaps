import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';


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

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
   private boundaryArray : number[];

   mapOverlay : any = null;

   //A hard coded sized fro 5 classes of GC maps
   private circleSizesArray : number[] = [10,20,30,40,50];

   selectedAttribute : string = "";

  //  ratioColorsList : string[] = randomColor({
  //       count: 100,
  //       // luminosity: 'dark',
  //       hue: 'red',
  //       // format: 'hsl'
  // });

  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService) { 
                super();
              }

  ngOnInit() {
    console.log("Graduated Circular init");
    this.plotBaicMap();
  }

  sizeOptionSelected(value){
    console.log("Size variable in GCMap is" + value);
    this.selectedAttribute = value;
    this.loadGraduatedCircularMap(value);

  }

  colorOptionSelected(value){
    console.log("Color variable in GCMap is" + value);
  }

  public loadGraduatedCircularMap(attributeName : string){
    console.log( this._dataProviderService.getCSVJSON());
    var type = this._basicCalculationsService.getType_CSV(this._dataProviderService.getCSVJSON(),attributeName);
    if(type =="number"){//Generate gc maps only for numerical data
      this.boundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray_CSV(this._dataProviderService.getCSVJSON(),
                                                      attributeName,
                                                     5);  
      console.log(this.boundaryArray);
      

      if(this.mapOverlay != null)
        this.map.removeLayer(this.mapOverlay);
      
  
      var circleStyle = this.drawCircle;
      console.log("circleStyle" + circleStyle);
      var customLayer = L.geoJson(null, {
        pointToLayer : circleStyle
      });

      this.mapOverlay = omnivore.csv.parse( this._dataProviderService.getCSV(),{
          // latfield: 'latitude',
          // lonfield: 'longitude',
          // delimiter: ','
      },customLayer );

      //zoom to layer
      this.map.fitBounds(this.mapOverlay.getBounds());

      // // var csvLayer = omnivore.csv.parse(this.mapData);
      this.map.addLayer(this.mapOverlay);
    }
   }

  private drawCircle = ( feature : any , latlng : any) : any => {
    return L.circleMarker(latlng, this.circleStyle(feature));
  }

  private circleStyle(feature : any) : any{
    // console.log("Get radius for feature ");
    // console.log(feature);
    //logic to get different circle sizes here
    return {
        radius: this.getCircleRadius(feature.properties[this.selectedAttribute]),
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
  }

  private getCircleRadius = (value : number) : number => {
    value = +value;
    for(var i=0; i < this.boundaryArray.length ; i++){       
        if(value <= this.boundaryArray[i]){ //check if value is within current class
           console.log("Value is : "+ value);
           console.log("Class Assigned is : "+ this.boundaryArray[i]);
           console.log("Cicle Size: "+ this.circleSizesArray[i]);
           return this.circleSizesArray[i];
        }
      }  
      console.log("Should not be here: " + "Radius value not found"); 
    return -1;
  }

  

}
