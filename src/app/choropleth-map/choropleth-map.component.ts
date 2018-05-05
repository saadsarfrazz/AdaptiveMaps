import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

declare var L: any;
// declare var randomColor : any;

@Component({
  selector: 'app-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css']
})
export class ChoroplethMapComponent extends BasicMapComponent implements OnInit {

  mapOverlay : any = null;
  selectedAttribute : string = "";

  geoJSONData : any;
  
  mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP;


  //details : http://randomcolor.llllll.li/
  // private nominalColorsList : string[] = this._colorProviderService.getNominalDataColors(100) ;


  ratioColorsList : string[] = this._colorProviderService.getRatioDataColors(5);


  // private nominalColorIndex : number = 0;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [0,20,40,60,80,100]
  private boundaryArray : number[];

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

  //do whatever here
  attributeSelected(value : ColumnNames){
    console.log("ChoroplethMap value selected is : "+ value);
    //identify kind of overlay data to expect 
    var dataType = this._dataProviderService.uploadedData_Type;
    if(dataType== 'geojson'){
      this.drawGeoJSONDataOnMap(value);
    }
    //TODO : support csv here
    
  }
  
  public drawGeoJSONDataOnMap(attributeSelected : ColumnNames){
    //init index for map colors
    // this.nominalColorIndex = 0;
    this.selectedAttribute = attributeSelected.column_name;
    //get type of values for this attribute 
    // var type = this._basicCalculationsService.getType(this.geoJSONData,attributeName);
    if(attributeSelected.type == "ratio"){//init array
      this.boundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray(this.geoJSONData,
                                                      attributeSelected.column_name,
                                                      5);        
    }else if(attributeSelected.type == "nominal"){ //remove legend if exist
      //get json object with unique attribute value as key and their frequency
      //as value
      this.nominalValuesFreqAndColor = this._basicCalculationsService.getNominalArray(this.geoJSONData,
                                                      attributeSelected.column_name);
      
      
      
      //remove existing legend
      this.boundaryArray = null;
    }

      
    // console.log("map service update map" + attributeName );
    //  console.log("mapOverlay"+ mapOverlay);
      
    if(this.mapOverlay != null)
      this.map.removeLayer(this.mapOverlay);

    // console.log(this.customStyle);

    // this.selectedObject = attributeName;
    // var customstyle = this.customStyle;
    this.mapOverlay = L.geoJson(this.geoJSONData, {
                  style : this.customStyle
                        });
        
    //zoom to layer
    this.map.fitBounds(this.mapOverlay.getBounds());

    this.map.addLayer(this.mapOverlay);
   }

   private customStyle = (feature : any) : any => {

    // var self = this;
    var selectedAttribute = this.selectedAttribute;
    return {
        fillColor: this.getColor(feature.properties[selectedAttribute]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

   private getColor = (value : any) : string => {
    //  d represent string value , could be used here if req'
    // console.log(typeof d);
    if( typeof value == "string"){
      // var color = this.nominalColorsList[this.nominalColorIndex];
      // this.nominalColorIndex++;
      return this.nominalValuesFreqAndColor[value]["color"];
    }else{  
      //update colorList size by initializing it based on boundary array size
      var size = this.boundaryArray.length;
      this.ratioColorsList  = this._colorProviderService.getRatioDataColors(size);

      //assign same color for each class
      //starting from 1 because 0 index contain min value
      for(var i=1; i < this.boundaryArray.length ; i++){
        console.log("Value is "+ value);
        console.log("Class boundary is "+ this.boundaryArray[i]);
        if(value <= this.boundaryArray[i]){ //check if value is within current class
          var color = this.ratioColorsList[i];
          console.log("color returned " + color);
          return color;
        }
      }      
      console.log("Outside for ");
      return color;
    }
  }

}
