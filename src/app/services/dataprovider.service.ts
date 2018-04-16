import { Injectable,Input } from '@angular/core';

@Injectable()
export class DataproviderService {

  //used by mapcomponents to identify which kind of data to 
  //expect when drawing new map layer
  public uploadedData_Type : string;

  private csvData : any;

  private geoJSONData : any;

  constructor() { }
  /**
   * Returns a list of all names of columns found in uploaded file
   */
  public getAllAttributesNames() : string [] {
    if(this.uploadedData_Type == "geojson"){
      console.log( this.geoJSONData);
      var firstJSON = this.geoJSONData["features"][0]["properties"];
      var attributesList = Object.keys(firstJSON);
      return attributesList;
    }else if(this.uploadedData_Type == "csv"){
      //get attribute names from csv file here
    }
    
  }

  public setGeoJSON(data : any){
    this.uploadedData_Type = "geojson";
    this.geoJSONData = data;
  }

  public getGeoJSON(): any{
    return this.geoJSONData;
  }

  public setCSV(data : any){
    this.uploadedData_Type = "csv";
    this.csvData = data;
  }

  public getCSV(): any{
    return this.csvData;
  }

}
