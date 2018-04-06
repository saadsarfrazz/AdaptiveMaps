import { Injectable,Input } from '@angular/core';
import {EXAMPLE_JSON_POLY} from '../shared/example-geojson-polygon';

@Injectable()
export class DataproviderService {

  public _mapData : string = "";

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
    var firstJSON = EXAMPLE_JSON_POLY.features[0]["properties"];
    var attributesList = Object.keys(firstJSON);
    return attributesList;
  }

}
