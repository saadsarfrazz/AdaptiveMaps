import { Injectable } from '@angular/core';

@Injectable()
export class BasicCalculationsService {

  constructor() { }

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
   * Takes a geoJSON and feature property to calculate minimum
   * value of that property. Property must be number and valid name.
   */
  public getMin(object: any, property : string): number{

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
  public getMax(object: any, property : string): number{

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
  public getType(object: any, property : string): string {
    var value = object.features[0]["properties"][property];
    console.log(value);
    if(!isNaN(value)){ // "3" or 3 will be true, "e" will be false
      return "number"; 
    }
    return typeof value;
  }

}
