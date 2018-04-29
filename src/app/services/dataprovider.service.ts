import { Injectable,Input } from '@angular/core';

import {VisualizationProviderService} from './visualization-provider.service';

import {ValidVisualizations} from '../interfaces/valid-visualizations-interface';
import {ColumnNames} from '../interfaces/column-names-interface';
import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";

//loading Papa library required for csv parsing
declare var Papa : any;

@Injectable()
export class DataproviderService {

  //used by mapcomponents to identify which kind of data to 
  //expect when drawing new map layer
  public uploadedData_Type : string;

  private csvData : any;
  //used for processing on data because csv file can't be parsed 
  //to calulate basic statistics likes min/max value of some attribute
  private csvDataJSON : any;

  private geoJSONData : any;

  //default column names
  private columnNames : string [];

  private columnNamesWithScales : ColumnNames[] = [];

  public setColumnNamesWithDataScale(columnNamesWithScales : ColumnNames[]){
    this.columnNamesWithScales = columnNamesWithScales;
  }

  //column names for CHOROPLETH_MAP
  private columnNamesChoroplethmap : ColumnNames[];

  //a json object containing meta information about
  //valid visualizations that can be created
  private validVisualizations : ValidVisualizations;

  constructor(private _visualizationProviderService: VisualizationProviderService) { }
  /**
   * Returns a list of all names of columns found in uploaded file
   * irrespective of its type
   */
  public getDefaultAttributesNames() : string [] {
      return this.columnNames;
  }
  
  /**
   * returns default column names if nothing is selected
   */
  public getAllAttributesNames(visualizationName : SUPPORTED_VISUALIZATIONS_ENUM) : string [] {
    if(visualizationName == SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP){
      //return valid list here
    }
      return this.columnNames;
  }
  
  /**
   * Helper method to set the data that is then used by all 
   * components to get the values.
   * 
   */
  public setGeoJSON(data : any){
    this.uploadedData_Type = "geojson";
    this.geoJSONData = data;

    //set attribute/column names
    var firstJSON = this.geoJSONData["features"][0]["properties"];
    this.columnNames = Object.keys(firstJSON);
    //prepare which visualizations can be created
    this.prepareValidVisualizations();

    // Update the visualization provider service data
    console.log("Valid visualizations");
    console.log(this.validVisualizations);
    this._visualizationProviderService.updateVisualizationInformation(this.validVisualizations);

    //prepare columnNames for different visualizations
  }

  public setCSV(data : any){
    this.uploadedData_Type = "csv";
    this.csvData = data;

    //set attribute names from csv file here
    //converting csv to json using library Papa
    var columnNames= [];
    var parsedData;
    Papa.parse(this.csvData, {
      complete: function(results) {
        columnNames = results.data[0];
        parsedData = results;
        // console.log("Finished:", results.data);
      }
    });
    this.csvDataJSON = parsedData;
    console.log("File Parse with column Names" + columnNames);
    this.columnNames = columnNames;
  }

  public getGeoJSON(): any{
    return this.geoJSONData;
  }

  public getCSV(): any{
    return this.csvData;
  }

  public getCSVJSON(): any {
    return this.csvDataJSON;
  }

  /**
   * Parses the uploaded data and evaluate which of the 
   * visualizations can be created for this data
   */
  private prepareValidVisualizations(){
    //1. check if geoJson data was uploaded
    if(this.uploadedData_Type = "geojson"){
      //1. Get data type
      var type = this.geoJSONData["features"][0]["geometry"]["type"];
      console.log("Type of data uploaded: " + type);
      this.validVisualizations= {dataType : type, detectedVisualizations : []};
      //2. rules for each visualization to be enabled
      var freq_JSON = this.getDataTypeFrequencies();
      console.log("Frequencies found")
      console.log(freq_JSON);
      //2.a if data type is polygon and has nominal/ratio data
      //Push: CHOROPLETH_MAP
      if(type=="Polygon" && (freq_JSON.nominal>0 || freq_JSON.ratio>0) ){
        this.validVisualizations.detectedVisualizations.push(SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP);
      }else if(type=="Point"){
        //GCM-1
        if(freq_JSON.ratio > 0 ){
          this.validVisualizations.detectedVisualizations.push(SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP_1);
        }
        
        //GCM-2
        if(freq_JSON.nominal>0 || freq_JSON.ratio>0){
          this.validVisualizations.detectedVisualizations.push(SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP_2);
        }

        //DOT-map
        if(freq_JSON.nominal>0 && freq_JSON.interval>0){
          this.validVisualizations.detectedVisualizations.push(SUPPORTED_VISUALIZATIONS_ENUM.DOT_MAP);
        }

        //Pie Chart map
        if(freq_JSON.ratio > 1){
          this.validVisualizations.detectedVisualizations.push(SUPPORTED_VISUALIZATIONS_ENUM.PIE_CHARTMAP);
        }

        //TODO: heat maps here

      }             
    }
  }

  /**
   * returns: {
   *  nominal : frequency,
   *  ordinal : frequency,
   * interval : frequency,
   *  ratio : frequency
   * }
   * where frequency is the number of occurences found in the data
   * i.e. if nominal data is found once, it will contain "nominal : 1"
   */
  private getDataTypeFrequencies(): any{
    var scales_json = {
      nominal : 0,
      ordinal : 0,
      interval : 0,
      ratio : 0
    };
    if(this.uploadedData_Type == "geojson"){
      for(let columnName of this.columnNames ){
        //get the value
        var value = this.geoJSONData.features[0]["properties"][columnName];
        var valueType = this.getValueType(value);
        if(valueType!=null){
          scales_json[valueType]++;
        }else{
          alert("TODO: null type found for column : " + columnName);
          //TODO: look for value iteratively for other objects
          //until attribute value is found
        }
        
      }
    }
    return scales_json;
  } 

  /**
   * valid return value types are 
   *  1. nominal
   *  2. ordinal
   *  3. interval
   *  4. ratio
   * null, if value was valid i.e. null or empty or undefined
   */
  private getValueType(value) : any {
    if(value){
      if(isNaN(value)){
        return "nominal";
      }else{
        return "ratio";
      }
    }
    return null;
  }

}
