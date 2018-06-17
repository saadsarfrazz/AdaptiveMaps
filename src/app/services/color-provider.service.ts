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
      return d3.schemeReds[size];
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
    for (var i=1;i<=size;i++){
      t_values.push( i/size );
    }

    var colorArray = [];
    for (var i=0;i<t_values.length;i++){
      colorArray.push( d3.interpolateRainbow( t_values[i] ) );
    }

    return colorArray;
  }

  //used by interval dot map
  public getPlasmaColors(size){
    //we are using half of the interpolatePlasma color band
    //that's why computing t range values of between [0.5-1] for given size
    //e.g. for size of 5 the t_values may look like [0.6,0.7,0.8,0.9,1] 
    var startFrom = 50; //50%
    var incrementPerUnit = 50/size; //e.g. for 10 classes is 5 
    
    //normalize the values b/w 0.5-1
    var t_values = [];
    var currentValue = startFrom;
    for (var i=0;i<size;i++){
      currentValue +=  incrementPerUnit;
      t_values.push( currentValue/100 );
    }
    console.log("k values");
    console.log(t_values);
    var colorArray = [];
    for (var i=0;i<t_values.length;i++){
      colorArray.push( d3.interpolatePlasma( t_values[i] ) );
    }

    console.log("Color array created of size: " + colorArray.length)

    return colorArray;
  }

}
