import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";

declare var L: any;

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

   //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
  //it will be used to assign different colors to circles
   private colorBoundaryArray : number[];

   mapOverlay : any = null;

   //A hard coded sized fro 5 classes of GC maps
   private circleSizesArray : number[] = [10,20,30,40,50];

   selectedSizeAttribute : string = "";
   selectedColorAttribute : string = "";

   ratioColorsList : string[] = this._colorProviderService.getRatioDataColors(5);

   mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP_2;

  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) { 
                super();
              }

  ngOnInit() {
    console.log("Graduated Circular init");
    this.plotBaicMap();
    console.log("Color array is");
  }

  sizeOptionSelected(value){
    console.log("Size variable in GCMap is" + value);
    this.selectedSizeAttribute = value;
    this.loadGraduatedCircularMap(value);

  }

  colorOptionSelected(attributeValue){

    this.selectedColorAttribute = attributeValue;
    console.log("Color variable in GCMap is" + attributeValue);
    //updata colors for each circle
    //Step:1 Calculate statitics i.e. class intervals for this attribute
    console.log( this._dataProviderService.getCSVJSON());
    var type = this._basicCalculationsService.getType_CSV(this._dataProviderService.getCSVJSON(),attributeValue);
    if(type =="number"){//Generate gc maps only for numerical data
      this.colorBoundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray_CSV(this._dataProviderService.getCSVJSON(),
                                                      attributeValue,
                                                     5);  
    console.log("Color boundary array : " + this.colorBoundaryArray);
    //Step-2 : Remove existing mapoverlay and redraw the circles with 
    //new color scheme
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
    var circle = L.circleMarker(latlng, this.circleStyle(feature));
    // circle.setStyle({fillColor: "#3388ff"});
    //only size is selected
    if(this.selectedColorAttribute!=""){
      var popup_msg = this.selectedSizeAttribute+ " : "+feature.properties[this.selectedSizeAttribute] +
                  "<br>" + this.selectedColorAttribute + " : "+feature.properties[this.selectedColorAttribute];
      circle.bindPopup( popup_msg);
    }else{
      circle.bindPopup( this.selectedSizeAttribute+ " : "+feature.properties[this.selectedSizeAttribute]);
    }
    
    return circle;
  }

  private circleStyle(feature : any) : any{
    // console.log("Get radius for feature ");
    // console.log(feature);
    //logic to get different circle sizes here
    return {
        radius: this.getCircleRadius(feature.properties[this.selectedSizeAttribute]),
        fillColor: this.getCircleColor(feature.properties[this.selectedColorAttribute]),
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

  private getCircleColor = (value: number) : string => {
    //will be invoked when no color attribute is selected 
    //by user yet
    if(isNaN(value)){
      return "#3388ff";
    }
    //assign same color for each class
    for(var i=0; i < this.colorBoundaryArray.length ; i++){
      console.log("Value is "+ value);
      console.log("Class boundary is "+ this.colorBoundaryArray[i]);
      if(value <= this.colorBoundaryArray[i]){ //check if value is within current class
        var color = this.ratioColorsList[i];
        console.log("color returned " + color);
        return color;
      }     
    }
    console.log("Should not be here : No Color Found");
    return "";
  }
  

}
