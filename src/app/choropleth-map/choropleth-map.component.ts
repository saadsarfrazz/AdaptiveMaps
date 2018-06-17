import { Component, OnInit, ViewChild } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

import {VisualVariableComponent} from '../visual-variable/visual-variable.component';

declare var L: any;
// declare var randomColor : any;

@Component({
  selector: 'app-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css']
})
export class ChoroplethMapComponent extends BasicMapComponent implements OnInit {

  @ViewChild('colorNominalVariable')
  colorNominalVariable : VisualVariableComponent;

  @ViewChild('colorRatioVariable')
  colorRatioVariable : VisualVariableComponent;

  mapOverlay : any = null;
  selectedNominalAttribute : ColumnNames;
  selectedRatioAttribute : ColumnNames;

  //to store a value of column
  //name irrespected of its data type 
  //to be used in layer style and popup
  selectedColumnName : string;

  
  mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP;


  //details : http://randomcolor.llllll.li/
  // private nominalColorsList : string[] = this._colorProviderService.getNominalDataColors(100) ;


  ratioColorsList : string[] = this._colorProviderService.getRatioDataColors(5);


  // private nominalColorIndex : number = 0;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [0,20,40,60,80,100]
  private colorBoundaryArray : number[];

  //nominal keys
  nominalKeysForLegend : string[];

  //json object containing unique attribute value as key and object of their frequency
  //and color as values. Is init using calculation service for given selected
  //attribute of type nominal
  //e.g. { attributevalue1: {freq:3,color:"rgb(10,10,10)"}}
  private nominalValuesFreqAndColor : any;
  
  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) {                
    super();
    this.geoJSONData =  _dataProviderService.getGeoJSON();
  }

  ngOnInit() {
    console.log("Choropleth init");
    this.plotBaicMap();
  }

  resetOverlay(){
    if(this.mapOverlay)
      this.map.removeLayer(this.mapOverlay);
  }

  //do whatever here
  attributeSelectedNominal(attributeSelected : ColumnNames){
    //check for null value
    //occur when selected column is removed
    if(attributeSelected){
      //reset other visual variable option if was selected
      this.colorRatioVariable.attributeSelected = null;

      this.selectedNominalAttribute = attributeSelected;
      this.selectedRatioAttribute = null;
      this.selectedColumnName = attributeSelected.column_name;
      //identify kind of overlay data to expect 
      // var dataType = this._dataProviderService.uploadedData_Type;
      //get json object with unique attribute value as key and their frequency
      //as value
      this.nominalValuesFreqAndColor = this._basicCalculationsService.getNominalArray(this.geoJSONData,
                                                      attributeSelected.column_name);
      
      this.nominalKeysForLegend = Object.keys(this.nominalValuesFreqAndColor);
      
      //remove existing legend
      this.colorBoundaryArray = null;

      this.drawGeoJSONDataOnMap(attributeSelected);
    }else{
      this.selectedNominalAttribute = attributeSelected;
      this.resetOverlay();
    }
    
    
  }

  //do whatever here
  attributeSelectedRatio(attributeSelected : ColumnNames){

    //check for null value
    //occur when selected column is removed
    if(attributeSelected){
      //reset other visual variable option if was selected
      this.colorNominalVariable.attributeSelected = null;

      this.selectedRatioAttribute = attributeSelected;
      this.selectedColumnName = attributeSelected.column_name;
      this.selectedNominalAttribute = null;
      //identify kind of overlay data to expect 
      // var dataType = this._dataProviderService.uploadedData_Type;
      this.colorBoundaryArray = this._basicCalculationsService.
                                  calculateBoundaryArray(this.geoJSONData,
                                                        attributeSelected.column_name,
                                                        5);        
      
      
      this.drawGeoJSONDataOnMap(attributeSelected);
    }else{
      this.selectedRatioAttribute = attributeSelected;
      this.resetOverlay();
    }
  }
  
  public drawGeoJSONDataOnMap(attributeSelected : ColumnNames){
      
    if(this.mapOverlay != null)
      this.map.removeLayer(this.mapOverlay);


    // this.selectedObject = attributeName;
    // var customstyle = this.customStyle;
    this.mapOverlay = L.geoJson(this.geoJSONData, {
                          style : this.customStyle
                        });

    this.mapOverlay.bindPopup(this.customPopup);        
    //zoom to layer
    this.map.fitBounds(this.mapOverlay.getBounds());

    this.map.addLayer(this.mapOverlay);
   }

   private customStyle = (feature : any) : any => {

    // var self = this;
    var selectedAttribute = this.selectedColumnName;
    return {
        fillColor: this.getColor(feature.properties[selectedAttribute]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  private customPopup = (layer) => {
     var value = layer.feature.properties[this.selectedColumnName];
     var popup = "<strong>"+this.selectedColumnName+"</strong>" + " : "+ value;
     return popup;
  }

  

   private getColor = (value : any) : string => {
    //  d represent string value , could be used here if req'
    // console.log(typeof d);
    if( this.selectedNominalAttribute ){
      // var color = this.nominalColorsList[this.nominalColorIndex];
      // this.nominalColorIndex++;
      return this.nominalValuesFreqAndColor[value]["color"];
    }else{  
      value=+value; 
      //update colorList size by initializing it based on boundary array size
      var size = this.colorBoundaryArray.length;
      this.ratioColorsList  = this._colorProviderService.getRatioDataColors(size);

      //assign same color for each class
      //starting from 1 because 0 index contain min value
      for(var i=1; i < this.colorBoundaryArray.length ; i++){
        console.log("Value is "+ value);
        console.log("Class boundary is "+ this.colorBoundaryArray[i]);
        if(value <= this.colorBoundaryArray[i]){ //check if value is within current class
          var color = this.ratioColorsList[i-1];
          console.log("color returned " + color);
          return color;
        }
      }      
      console.log("Outside for ");
      return color;
    }
  }

}
