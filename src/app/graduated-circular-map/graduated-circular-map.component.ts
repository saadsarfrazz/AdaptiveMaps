import { Component, OnInit, ViewChild } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

import {VisualVariableComponent} from '../visual-variable/visual-variable.component';

declare var L: any;

//lib to overlay csv file
declare var omnivore : any;


@Component({
  selector: 'app-graduated-circular-map',
  templateUrl: './graduated-circular-map.component.html',
  styleUrls: ['./graduated-circular-map.component.css']
})
export class GraduatedCircularMapComponent extends BasicMapComponent implements OnInit {

  @ViewChild('colorNominalVariable')
  colorNominalVariable : VisualVariableComponent;

  @ViewChild('colorRatioVariable')
  colorRatioVariable : VisualVariableComponent;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
   private boundaryArray : number[];

   //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
  //it will be used to assign different colors to circles
  private colorBoundaryArray : number[];

  //json object containing unique attribute value as key and object of their frequency
  //and color as values. Is init using calculation service for given selected
  //attribute of type nominal
  //e.g. { attributevalue1: {freq:3,color:"rgb(10,10,10)"}}
  private nominalValuesFreqAndColor : any;
  //nominal keys
  nominalKeysForLegend : string[];

   mapOverlay : any = null;

   //A hard coded sized fro 5 classes of GC maps
   private circleSizesArray : number[] = [10,20,30,40,50,60,70];

   //a hardcoded circular sizes when none of the size attribute is 
   //selected by user
   private staticCircularSize : number = 20;

   selectedSizeAttribute : string = "";
   selectedColorAttribute : ColumnNames;

   ratioColorsList : string[] = this._colorProviderService.getRatioDataColors(5);

   mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP;

  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) { 
                super();
              }

  ngOnInit() {
    console.log("Graduated Circular init");
    this.plotBaicMap();
    this.geoJSONData =  this._dataProviderService.getGeoJSON();
  }

  sizeOptionSelected(columnName : ColumnNames){
    // console.log("Size variable in GCMap is" + columnName.column_name);
    this.selectedSizeAttribute = columnName.column_name;
    // this.loadGraduatedCircularMap_CSV(columnName.column_name);
    
    this.loadGraduatedCircularMap_JSON(columnName);

  }

  colorOptionSelected_Nominal(columnName : ColumnNames){
    //reset other visual variable option if was selected
    this.colorRatioVariable.attributeSelected = null;
    this.colorOptionSelected(columnName);
  }

  colorOptionSelected_Ratio(columnName : ColumnNames){
    //reset other visual variable option if was selected
    this.colorNominalVariable.attributeSelected = null;
    this.colorOptionSelected(columnName);
  }

  colorOptionSelected(columnName : ColumnNames){

    this.selectedColorAttribute = columnName;
    // console.log("Color variable in GCMap is" + attributeValue);

    //updata colors for each circle
    //Step:1 Calculate statitics i.e. class intervals for this attribute
    if(columnName.type =="ratio"){//Generate gc maps only for numerical data
      this.colorBoundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray(this.geoJSONData,
                                                      columnName.column_name,
                                                     5);  
      console.log("Color boundary array : " + this.colorBoundaryArray);
      //delete nominal values if exist
      this.nominalKeysForLegend = null;      
    }else if (columnName.type =="nominal"){
      //get json object with unique attribute value as key and their frequency
      //as value
      this.nominalValuesFreqAndColor = this._basicCalculationsService.getNominalArray(this.geoJSONData,
                                                      columnName.column_name);      
      this.nominalKeysForLegend = Object.keys(this.nominalValuesFreqAndColor);
      
      //delete ratio values if exist
      this.colorBoundaryArray = null;
    }

      //Step-2 : Remove existing mapoverlay and redraw the circles with 
      //new color scheme
      if(this.mapOverlay != null)
        this.map.removeLayer(this.mapOverlay);

      var circleStyle = this.drawCircle;
      this.mapOverlay = L.geoJson(this.geoJSONData, {
        pointToLayer : circleStyle
      });

      //zoom to layer
      this.map.fitBounds(this.mapOverlay.getBounds());

      // // var csvLayer = omnivore.csv.parse(this.mapData);
      this.map.addLayer(this.mapOverlay);
    
  }

    public loadGraduatedCircularMap_JSON(attributeName : ColumnNames){
    if(attributeName.type =="ratio"){//Generate gc maps only for numerical data
      this.boundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray(this._dataProviderService.getGeoJSON(),
                                                      attributeName.column_name,
                                                     5);  
      console.log(this.boundaryArray);
      

      if(this.mapOverlay != null)
        this.map.removeLayer(this.mapOverlay);
      
  
      var circleStyle = this.drawCircle;
      // console.log("circleStyle" + circleStyle);
      this.mapOverlay = L.geoJson(this.geoJSONData, {
        pointToLayer : circleStyle
      });
      //zoom to layer
      this.map.fitBounds(this.mapOverlay.getBounds());

      this.map.addLayer(this.mapOverlay);
    }
   }

  private drawCircle = ( feature : any , latlng : any) : any => {
    var circle = L.circleMarker(latlng, this.circleStyle(feature));
    // circle.setStyle({fillColor: "#3388ff"});
    //both size and color is selected
    if(this.selectedColorAttribute && this.selectedColorAttribute.column_name!=""){
      var popup_msg;
      if(this.selectedSizeAttribute){//both color and size is selected
        popup_msg = this.selectedSizeAttribute+ " : "+feature.properties[this.selectedSizeAttribute] +
                  "<br>" + this.selectedColorAttribute.column_name + " : "+feature.properties[this.selectedColorAttribute.column_name];
      }else{
        popup_msg = this.selectedColorAttribute.column_name + " : "+feature.properties[this.selectedColorAttribute.column_name];
      }
      circle.bindPopup( popup_msg);
    }else if( this.selectedSizeAttribute ){ //only size is selected
      circle.bindPopup( this.selectedSizeAttribute+ " : "+feature.properties[this.selectedSizeAttribute]);
    }
    
    return circle;
  }

  private circleStyle(feature : any) : any{
    var circleRadius;
    //when no size option is specified
    if(this.selectedSizeAttribute){
      circleRadius = this.getCircleRadius(feature.properties[this.selectedSizeAttribute]);
    }else{
      circleRadius = this.staticCircularSize;
    }
     
    // console.log("Get radius for feature ");
    // console.log(feature);
    //logic to get different circle sizes here
    return {
        radius: circleRadius,
        fillColor: this.getCircleColor(feature),
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
          //  console.log("Value is : "+ value);
          //  console.log("Class Assigned is : "+ this.boundaryArray[i]);
          //  console.log("Cicle Size: "+ this.circleSizesArray[i]);
           return this.circleSizesArray[i];
        }
      }  
      console.log("Should not be here: " + "Radius value not found"); 
    return -1;
  }
  /**
   * Assigns color to given value based on colorBoundaryArray.
   * if value is null then returns color black
   * 
   */
  private getCircleColor = (feature : any) : string => {
    //default color because color attribute is not selected
    //yet
    if(this.selectedColorAttribute == null){
      return "#FFFF00";
    }

    var value = feature.properties[this.selectedColorAttribute.column_name];
    console.log("Value is "+ value);
    var color = null;
    if(value == null || value == "" || value == undefined){ //assign black
      color =  "#0c0c00";
    }else{
      if(this.selectedColorAttribute.type == "ratio"){
        for(var i=1; i < this.colorBoundaryArray.length ; i++){
          // console.log("Class boundary is "+ this.colorBoundaryArray[i]);
          if(value <= this.colorBoundaryArray[i]){ //check if value is within current class
            color = this.ratioColorsList[i-1];
            console.log("color returned " + color);
            break;
          }     
        }
      }else if (this.selectedColorAttribute.type == "nominal"){
        // var color = this.nominalColorsList[this.nominalColorIndex];
        // this.nominalColorIndex++;
          color =  this.nominalValuesFreqAndColor[value]["color"];
      }      
    }
    
    if(color == null)
      console.log("Should not be here : No Color Found");
    
    console.log("Color Returned is "+ color);
    return color;
  }


  ////Deprecated - since csv is not focus for now
  // updateCircleColors_CSV(){
  //   var type = this._basicCalculationsService.getType_CSV(this._dataProviderService.getCSVJSON(),attributeValue);
  //   if(type =="number"){//Generate gc maps only for numerical data
  //     this.colorBoundaryArray = this._basicCalculationsService.
  //                               calculateBoundaryArray_CSV(this._dataProviderService.getCSVJSON(),
  //                                                     attributeValue,
  //                                                    5);  
  //   console.log("Color boundary array : " + this.colorBoundaryArray);
  //   //Step-2 : Remove existing mapoverlay and redraw the circles with 
  //   //new color scheme
  //   this.map.removeLayer(this.mapOverlay);

  //   var circleStyle = this.drawCircle;
  //   console.log("circleStyle" + circleStyle);
  //   var customLayer = L.geoJson(null, {
  //     pointToLayer : circleStyle
  //   });

  //   this.mapOverlay = omnivore.csv.parse( this._dataProviderService.getCSV(),{
  //       // latfield: 'latitude',
  //       // lonfield: 'longitude',
  //       // delimiter: ','
  //   },customLayer );

  //   //zoom to layer
  //   this.map.fitBounds(this.mapOverlay.getBounds());

  //   // // var csvLayer = omnivore.csv.parse(this.mapData);
  //   this.map.addLayer(this.mapOverlay);



  //   }
  // }

  //deprecated - can be used for CSV data sets for future
  // public loadGraduatedCircularMap_CSV(attributeName : string){
  //   console.log( this._dataProviderService.getCSVJSON());
  //   var type = this._basicCalculationsService.getType_CSV(this._dataProviderService.getCSVJSON(),attributeName);
  //   if(type =="number"){//Generate gc maps only for numerical data
  //     this.boundaryArray = this._basicCalculationsService.
  //                               calculateBoundaryArray_CSV(this._dataProviderService.getCSVJSON(),
  //                                                     attributeName,
  //                                                    5);  
  //     console.log(this.boundaryArray);
      

  //     if(this.mapOverlay != null)
  //       this.map.removeLayer(this.mapOverlay);
      
  
  //     var circleStyle = this.drawCircle;
  //     console.log("circleStyle" + circleStyle);
  //     var customLayer = L.geoJson(null, {
  //       pointToLayer : circleStyle
  //     });

  //     this.mapOverlay = omnivore.csv.parse( this._dataProviderService.getCSV(),{
  //         // latfield: 'latitude',
  //         // lonfield: 'longitude',
  //         // delimiter: ','
  //     },customLayer );

  //     //zoom to layer
  //     this.map.fitBounds(this.mapOverlay.getBounds());

  //     // // var csvLayer = omnivore.csv.parse(this.mapData);
  //     this.map.addLayer(this.mapOverlay);
  //   }
  //  }

  

}
