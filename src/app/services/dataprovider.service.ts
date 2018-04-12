import { Injectable,Input } from '@angular/core';

@Injectable()
export class DataproviderService {

  public _mapData : string = "";

  public geoJSONData : any;

  public graduatedCircularMapData : string;

  @Input()
  set mapData(mapData : string){
    this._mapData = mapData;
  }

  constructor() { }
  /**
   * Returns a list of all names of columns found in uploaded file
   */
  public getAllAttributesNames() : string [] {
    console.log( this.geoJSONData);
    var firstJSON = this.geoJSONData["features"][0]["properties"];
    var attributesList = Object.keys(firstJSON);
    return attributesList;
  }

  public getGeoJSON(): any{
    return this.geoJSONData;
  }

}
