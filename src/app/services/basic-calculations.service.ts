import { Injectable } from '@angular/core';
import{ColorProviderService} from './color-provider.service';
@Injectable()
export class BasicCalculationsService {

  constructor(private _colorProviderService : ColorProviderService) { }

  /**
   * Calculates the boundaryArray of values.
   * @Input json: json object to parse
   * @Input proporty: property in json object for which values are to be calculated
   * @Input numberOfClasses: number of classes or number of values in result array
   */
  public calculateBoundaryArray(json: any, property : string, numberOfClasses : number) : number[]{
    var min = this.getMin(json,property);
    var max = this.getMax(json,property);
    var difference = max-min;
    var avg = difference/numberOfClasses;

    var result= [];
    result.push(min);
    var value = min+avg;
    for(var i=0; i<numberOfClasses-1;i++){
      result.push(value.toFixed(0));//ignore decimals
      value+= avg;
    }
    result.push(max);//ignore decimals
    console.log("Result array is " + result);
    return result;

  }

  /**
   * Identifies the frequency of each attribute and return it in 
   * the form of json object
   * json object containing unique attribute value as key and object of their frequency
   * and color as values. Is init using calculation service for given selected
   * attribute of type nominal
   * e.g. { attributevalue1: {freq:3,color:"rgb(10,10,10)"}}
   * }
   */
  public getNominalArray(dataJSON: any, propertyName : string) : any{
    
    var results = {};
    var uniqueValuesArray = [];
    //for each value 
    for(let feature of dataJSON.features){
      let value = feature["properties"][propertyName];
      if(value){
        if( !this.valueAlreadyExist(value,uniqueValuesArray) ){
          uniqueValuesArray.push(value);      
          results[value]={freq:1};
        }else{
          results[value]["freq"]++;
        }
      }      
    }
    console.log( results );

    //reinit color list based on list size
    // 1.Get size of values found in nominal data
    var size = uniqueValuesArray.length;
    console.log("Total Nominal Values found : " + size);
    var nominalColorsList =  this._colorProviderService.getNominalDataColors(size) ;

    //insert color values in results object
    var colorIndex = 0;
    for(let val of uniqueValuesArray){
      results[val]["color"] = nominalColorsList[colorIndex];
      colorIndex++;
    }

    return results;

  }

  //helper method to find out if value 
  //exist in given array
  private valueAlreadyExist(value,array) : boolean{
    for(let val of array ){
      if(val == value)
        return true
    }

    return false;
  }

  /**
   * Takes a geoJSON and feature property to calculate minimum
   * value of that property. Property must be number and valid name.
   */
  private getMin(object: any, property : string): number{

    var features = object.features;
    var min = features.reduce(function(prev, curr) {
        return prev["properties"][property] < curr.properties[property] ? prev : curr;
  });

    console.log("Min is: "+ min["properties"][property]);

    return min["properties"][property];
  }

  /**
   * Takes a geoJSON and feature property to calculate minimum
   * value of that property. Property must be number and valid name.
   */
  private getMax(object: any, property : string): number{

    var features = object.features;
    var max = features.reduce(function(prev, curr) {
        return prev["properties"][property] > curr.properties[property] ? prev : curr;
  });

    console.log("Max is: "+ max["properties"][property]);

    return max["properties"][property];
  }

  /**
   * Gets the type of attribute value and return it.
   * e.g. {"x":4} returns number
   * other valid return values are : number,string
   */
  // public getType(object: any, property : string): string {
  //   var value = object.features[0]["properties"][property];
  //   console.log(value);
  //   if(!isNaN(value)){ // "3" or 3 will be true, "e" will be false
  //     return "number"; 
  //   }
  //   return typeof value;
  // }

  public calculateBoundaryArray_CSV(csv_json: any, property : string, numberOfClasses : number) : number[]{
    var propertyIndex = this.getPropertyIndex(csv_json,property);
    console.log("Property Index " + propertyIndex);
    var min = this.getMin_CSV(csv_json,propertyIndex);
    var max = this.getMax_CSV(csv_json,propertyIndex);
    console.log("Min :" + min);
    console.log("Max :" + max);
    var difference = max-min;
    var avg = difference/numberOfClasses;

    var result= [];
    var value = min+avg;
    console.log(typeof value);
    for(var i=0; i<numberOfClasses-1;i++){
      result.push(value.toFixed(0));//ignore decimals
      value+= avg;
    }
    result.push(max);//ignore decimals
    // console.log("Result array is " + result);
    return result;
  }

  private getPropertyIndex(csv_json,property): number{

    for(var i=0; i<csv_json.data[0].length;i++){
      if(csv_json.data[0][i] == property)
        return i;
    }
    return -1 ;
  }

  private getMin_CSV(csv_json, index){
    var min = + csv_json.data[1][index];
    //for each row 
    //0 row contains headings
    for(var i = 2; i<csv_json.data.length ; i++ ){
      var current = + csv_json.data[i][index];
      if(min > current){
        min = current;
      }
    }
    return min;

  }

  private getMax_CSV(csv_json, index){
    //must be number, + converts "2" to 2
    var max = +csv_json.data[1][index];    
    //for each row 
    //0 row contains headings
    for(var i = 2; i<csv_json.data.length ; i++ ){
      var current = + csv_json.data[i][index];
      if(max < current ){
        max = current;
      }
    }
    return max;

  }

  public getType_CSV(csv_json,property): string {
    var propertyIndex = this.getPropertyIndex(csv_json,property);
    var value = csv_json.data[1][propertyIndex];
    console.log(value);
    if(!isNaN(value)){ // "3" or 3 will be true, "e" will be false
      return "number"; 
    }
    return typeof value;
  }

}
