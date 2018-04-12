import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {MapService} from '../services/map.service';
import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';

declare var L: any;
declare var randomColor : any;

@Component({
  selector: 'app-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css']
})
export class ChoroplethMapComponent extends BasicMapComponent implements OnInit {

  mapOverlay : any = null;
  selectedAttribute : string = "";

  geoJSONData : any;
  


  //details : http://randomcolor.llllll.li/
  private nominalColorsList : string[] = randomColor({
        count: 100,
        luminosity: 'dark',
  });

  private ratioColorsList : string[] = randomColor({
        count: 100,
        // luminosity: 'dark',
        hue: 'red',
        // format: 'hsl'
  });

  private nominalColorIndex : number = 0;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
  private boundaryArray : number[];
  
  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService) {                
    super();
    this.geoJSONData =  _dataProviderService.geoJSONData;
  }

  ngOnInit() {
    console.log("Choropleth init");
    this.plotBaicMap();
  }

  //do whatever here
  attributeSelected(value){
    console.log("ChoroplethMap value selected is : "+ value);
    this.drawDataOnMap(value);
  }
  
  public drawDataOnMap(attributeName : string){
    //init index for map colors
    this.nominalColorIndex = 0;
    this.selectedAttribute = attributeName;
    //get type of values for this attribute 
    var type = this._basicCalculationsService.getType(this.geoJSONData,attributeName);
    if(type =="number"){//init array
      this.boundaryArray = this._basicCalculationsService.
                                calculateBoundaryArray(this.geoJSONData,
                                                      attributeName,
                                                      5);        
    }

      
    console.log("map service update map" + attributeName );
    //  console.log("mapOverlay"+ mapOverlay);
      
    if(this.mapOverlay != null)
      this.map.removeLayer(this.mapOverlay);

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

   private getColor = (d : any) : string => {
    //  d represent string value , could be used here if req'
    // console.log(typeof d);
    if( typeof d == "string"){
      var color = this.nominalColorsList[this.nominalColorIndex];
      this.nominalColorIndex++;
      return color;
    }else{  
      //assign same color for each class
      for(var i=0; i < this.boundaryArray.length ; i++){
        console.log("Value is "+ d);
        console.log("Class boundary is "+ this.boundaryArray[i]);
        if(d <= this.boundaryArray[i]){ //check if value is within current class
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
