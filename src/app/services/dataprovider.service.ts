import { Injectable,Input } from '@angular/core';

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

  private columnNames : string [];

  constructor() { }
  /**
   * Returns a list of all names of columns found in uploaded file
   * irrespective of its type
   */
  public getAllAttributesNames() : string [] {
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

}
