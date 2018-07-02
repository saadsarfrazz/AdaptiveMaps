import { Component, OnInit, ViewChild } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

import {VisualVariableComponent} from '../visual-variable/visual-variable.component';

declare var L: any;
declare var turf: any;

@Component({
  selector: 'app-piechart-map',
  templateUrl: './piechart-map.component.html',
  styleUrls: ['./piechart-map.component.css']
})
export class PiechartMapComponent extends BasicMapComponent  implements OnInit {

  // @ViewChild('colorNominalVariable')
  // colorNominalVariable : VisualVariableComponent;

  // @ViewChild('colorRatioVariable')
  // colorRatioVariable : VisualVariableComponent;


  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [0,20,40,60,80,100]
  boundaryArray : number[];

  mapOverlay : any = null;
  selectedAttribute : ColumnNames;

  //A hard coded sized fro 5 classes of GC maps
   circleSizesArray : number[] = [10,20,30,40,50,60,70];

   //the selected column names for drawing pie chart are
   //stored in this array. 
   listOfSelectedAttributes : ColumnNames[] = [];

   //to keep track of all pie chart and remove them 
   //when redrawn 
   listOfPieCharts : any = [];

   nominalColorsList : string[] = this._colorProviderService.getNominalDataColors(9) ;

   //a hardcoded circular sizes when none of the size attribute is 
   //specified
   staticCircularSize : number = 20;

  
  mapType : SUPPORTED_VISUALIZATIONS_ENUM = SUPPORTED_VISUALIZATIONS_ENUM.PIE_CHARTMAP;


   constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) {                
    super();
    this.geoJSONData =  _dataProviderService.getGeoJSON();
  }

  ngOnInit() {
    console.log("PieChartMap init");
    this.plotBaicMap();
  }

  resetOverlay(){
    if(this.mapOverlay){
      this.map.removeLayer(this.mapOverlay);
      for(let marker of this.listOfPieCharts){
        this.map.removeLayer(marker);
      }
    }
  }

  // staticexample : ColumnNames = {column_name : "Shape_Area"};

  attributeSelectedSize(attributeSelected : ColumnNames){
    if(attributeSelected){
      //init index for map colors
      // this.nominalColorIndex = 0;
      this.selectedAttribute = attributeSelected;

      //testing here
      // this.listOfSelectedAttributes.push(attributeSelected);
      // this.listOfSelectedAttributes.push(this.staticexample);

      //get type of values for this attribute 
      // var type = this._basicCalculationsService.getType(this.geoJSONData,attributeName);
      if(attributeSelected.type == "ratio"){//init array
        this.boundaryArray = this._basicCalculationsService.
                                  calculateBoundaryArray(this.geoJSONData,
                                                        attributeSelected.column_name,
                                                        5);        
                                                      

        var addCircles = this.addCirclesFunction;
        
        this.resetOverlay();
          

        //draw circle in middle of each polygon
        this.mapOverlay = L.geoJson(this.geoJSONData, {
                            onEachFeature: addCircles,
                            style: {
                                    fillColor:"#d4ef4a",
                                    weight: 2,
                                    opacity: 1,
                                    color: 'white',
                                    dashArray: '3',
                                    fillOpacity: 0.7
                                }
                          });
        //zoom to layer
        this.map.fitBounds(this.mapOverlay.getBounds());

        this.map.addLayer(this.mapOverlay);
        this.mapOverlay.bringToBack();
        }
      }else{
        console.log("remove");
        this.selectedAttribute = attributeSelected;
        this.resetOverlay();

        //if pie chart attributes were selected
        if(this.listOfSelectedAttributes.length > 0)
          this.addOverlay(); 
      }
  }

  attributeSelectedPieChart(selectedColumns : ColumnNames[]){
    console.log("Selected Column Names are");
    console.log(selectedColumns);

    //reset existing selcted columns
    this.listOfSelectedAttributes = [];
    for(let col of selectedColumns){
      //TODO: check for repeating columns
      this.listOfSelectedAttributes.push(col);
    }

    for(let marker of this.listOfPieCharts){
      this.map.removeLayer(marker);
    }

    if(this.mapOverlay)
      this.map.removeLayer(this.mapOverlay);
    
    //at least on attribute to visualize or size attribute selected as first variable
    if(selectedColumns.length > 0 || this.selectedAttribute){
      this.addOverlay();
    }  
  }

  addOverlay(){
    var addCircles = this.addCirclesFunction;
    //add layer again 
    //draw circle in middle of each polygon
    this.mapOverlay = L.geoJson(this.geoJSONData, {
                        onEachFeature: addCircles,
                        style: {
                                fillColor:"#d4ef4a",
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            }
                      });
    //zoom to layer
    this.map.fitBounds(this.mapOverlay.getBounds());

    this.map.addLayer(this.mapOverlay);
    this.mapOverlay.bringToBack();
  }

  addCirclesFunction = (feature, layer) => {
    var radiusValue;
    if(this.selectedAttribute){ //if attribute is selected for sizes
       var attributeValue = feature["properties"][this.selectedAttribute.column_name];
       radiusValue = this.getCircleSize(attributeValue);
    }else{
      radiusValue = this.staticCircularSize;
    }
   

    var dataObject = this.prepareChartOptions(feature);

    var finalOptions= {};
    if(dataObject!=null){
      finalOptions["radius"] = radiusValue;
      finalOptions["data"] = dataObject["data"];
      finalOptions["chartOptions"] = dataObject["chartOptions"];
      finalOptions["weight"] = 1;
      finalOptions["fillOpacity"] = 0.9;
    }else{
      finalOptions =    {
            radius : radiusValue
            ,data: {
              'dataPoint1': 100
            },
            chartOptions: {
              'dataPoint1': {
                fillColor: '#b2410a',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayText: function (value) {
                  return value.toFixed(2);
                }
              }
            },
            weight: 1,
            fillOpacity : 0.9
            // color: '#000000',
          };
      }
    
      var centrioidObj = turf.centroid(feature);
      var coordinates = centrioidObj.geometry.coordinates;
      var marker = new L.PieChartMarker(new L.LatLng(coordinates[1], coordinates[0]), finalOptions );
      
      this.listOfPieCharts.push(marker);
      this.map.addLayer(marker);
    }

      /**
       * Returns null when this.listOfSelectedAttributes == 0
       * or 
       * a result object such that 
       * {
       *  data: {
                'dataPoint1': 100,
                'dataPoint2': Y,
                'dataPoint3': Z,
                ....
                },
          chartOptions: {
                 'dataPoint1': {
                  fillColor: '#b2410a',
                  minValue: 0,
                  maxValue: 20,
                  maxHeight: 20,
                  displayText: function (value) {
                    return value.toFixed(2);
                  }
                },
                  'dataPoint2': {
                  .....
       * }
       * 
       * object of all the valid data points values that
       * are to be displayed for given feature. The data points
       * are inserted based on number of columns selected to be 
       * displayed as pie chart maps
       * 
       */
      private prepareChartOptions = (feature : any) : any => {

        if(this.listOfSelectedAttributes.length != 0){
          var dataObject = {};
          var chartOptions = {};

          var colorIndex = 0;
          for (let attribute of this.listOfSelectedAttributes){
            var colName = attribute.column_name;
            var attrValue = feature["properties"][attribute.column_name];

            //data object
            dataObject[colName] = attrValue;

            //chart options
            chartOptions[colName] = {
                  fillColor: this.nominalColorsList[colorIndex],
                  minValue: 0,
                  maxValue: 20,
                  maxHeight: 20,
                  displayText: function (attrValue) {
                    return attrValue.toFixed(2);
                  } 
            }
            colorIndex++;
          }

          var result ={};
          result["data"] = dataObject;
          result["chartOptions"] = chartOptions;
          console.log("Final result");
          console.log(result);
          return result;
        }else{
          return null;
        }
        
      }

    /**
     * Gets class value to which given value belongs
     * returns null if invalid value
     */
    private getCircleSize = (value : any) : number => {
  
        var size = null;
        for(var i=1; i < this.boundaryArray.length ; i++){
          if(value <= this.boundaryArray[i]){ //check if value is within current class
            size  = this.circleSizesArray[i];
            break;
          }
        }      
        // console.log("Size for value "+value +" is : " + size);
        return size;
      }
    // }

}
