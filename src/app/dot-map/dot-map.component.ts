import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';


declare var L: any;

@Component({
  selector: 'app-dot-map',
  templateUrl: './dot-map.component.html',
  styleUrls: ['./dot-map.component.css']
})
export class DotMapComponent extends BasicMapComponent implements OnInit {

  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) { 
    super();
  }

  ngOnInit() {
    console.log("Dot Map initialized");
    this.plotBaicMap();
    this.geoJSONData = this._dataProviderService.getGeoJSON();
  }

  mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.DOT_MAP;

  selectedColorAttribute : ColumnNames;

  mapOverlay : any = null;

  intervalColorsArray : string[] = this._colorProviderService.getPlasmaColors(12);

  //stores the boundary values for different classes of intervalData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
  //it will be used to assign different colors to points
   private colorBoundaryArray : number[];

  //json object containing unique attribute value as key and object of their frequency
  //and color as values. Is init using calculation service for given selected
  //attribute of type nominal
  //e.g. { attributevalue1: {freq:3,color:"rgb(10,10,10)"}}
  private nominalValuesFreqAndColor : any;
  //nominal keys
  nominalKeysForLegend : string[];

  colorOptionSelected(columnName : ColumnNames){    
    this.selectedColorAttribute = columnName;
    console.log(columnName);
    // console.log("Color variable in GCMap is" + attributeValue);

    //updata colors for each circle
    //Step:1 Calculate statitics i.e. class intervals for this attribute
    if(columnName.type =="interval"){//Generate gc maps only for numerical data
      this.colorBoundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray(this.geoJSONData,
                                                      columnName.column_name,
                                                     12);  
      console.log("Color boundary array : " + this.colorBoundaryArray);
      //remove existing 
      this.nominalKeysForLegend = null;
    }else if(columnName.type =="nominal"){
      //get json object with unique attribute value as key and their frequency
      //as value
      this.nominalValuesFreqAndColor = this._basicCalculationsService.getNominalArray(this.geoJSONData,
                                                      columnName.column_name);
      
      this.nominalKeysForLegend = Object.keys(this.nominalValuesFreqAndColor);
      
      //remove existing legend
      this.colorBoundaryArray = null;
    }

    //Step-2 : Remove existing mapoverlay and redraw the circles with 
    //new color scheme
    if(this.mapOverlay!=null)
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

  private drawCircle = ( feature : any , latlng : any) : any => {
    var circle = L.circleMarker(latlng, this.circleStyle(feature));
    // circle.setStyle({fillColor: "#3388ff"});
    //only size is selected
    // if(this.selectedColorAttribute!=null){
    //   var popup_msg = this.selectedColorAttribute+ " : "+feature.properties[this.selectedColorAttribute.column_name] +
    //               "<br>" + this.selectedColorAttribute + " : "+feature.properties[this.selectedColorAttribute.column_name];
    //   circle.bindPopup( popup_msg);
    // }else{
      circle.bindPopup( this.selectedColorAttribute+ " : "+feature.properties[this.selectedColorAttribute.column_name]);
    // }
    
    return circle;
  }

  private circleStyle(feature : any) : any{
    // console.log("Get radius for feature ");
    // console.log(feature);
    //logic to get different circle sizes here
    return {
        radius: "5",
        fillColor: this.getCircleColor(feature.properties[this.selectedColorAttribute.column_name]),
        color: "",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
  }

  /**
   * Assigns color to given value based on colorBoundaryArray.
   * if value is null then returns color black
   * 
   */
  private getCircleColor = (value: number) : string => {
    
    if(this.selectedColorAttribute.type == "interval"){
      var color;
      if(value == null){ //assign black
        // color =  "#FFFF00";
        color = "";
      }else{
        for(var i=1; i < this.colorBoundaryArray.length ; i++){
          // console.log("Class boundary is "+ this.colorBoundaryArray[i]);
          if(value <= this.colorBoundaryArray[i]){ //check if value is within current class
            color = this.intervalColorsArray[i-1];
            // console.log("color returned " + color);
            break;
          }     
        }
      }
      
      if(color == null)
        console.log("Should not be here : No Color Found");
      return color;
    }else if(this.selectedColorAttribute.type == "nominal"){
      var color =this.nominalValuesFreqAndColor[value]["color"]; 
      // console.log("Color is : " + color);
      return color;
    }
  }

}
