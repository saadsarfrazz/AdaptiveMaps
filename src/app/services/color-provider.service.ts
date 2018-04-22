import { Injectable } from '@angular/core';

//https://github.com/d3/d3-scale-chromatic
//color 
declare var d3;

@Injectable()
export class ColorProviderService {

  constructor() { }

  public getRatioDataColors(size){
    //max possible seze is 9
    if(size<=9)
      return d3.schemeBlues[size];
    else{ //TODO: handle here
      alert("ColorProviderService.getRatioDataColors: could not create color array");
      return;
    }       
  }
  
  //https://github.com/d3/d3-scale-chromatic#cyclical
  //size must be <= 100
  public getNominalDataColors(size){
    console.log("init nominal color list of size : " + size);
    //normalize the values b/w 0-1
    var t_values = []
    for (var i=0;i<size;i++){
      t_values.push( i/size );
    }

    var colorArray = [];
    for (var i=0;i<t_values.length;i++){
      colorArray.push( d3.interpolateRainbow( t_values[i] ) );
    }

    return colorArray;
  }

}
