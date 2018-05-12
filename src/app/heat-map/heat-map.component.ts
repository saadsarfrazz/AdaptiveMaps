import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

declare var L: any;

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent extends BasicMapComponent implements OnInit {

  constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) { 
    super();
  }

  ngOnInit() {
    console.log("HeatMap init");
    this.plotBaicMap();
    this.geoJSONData = this._dataProviderService.getGeoJSON();
    var heatLayerArray = [];
    for(let feature of this.geoJSONData.features){
      var latlng = feature["geometry"]["coordinates"];
      //invert coordinates (syntax)
      var coord = [latlng[1], latlng[0]];
      heatLayerArray.push(coord);
      // console.log(coord);
    }

    console.log(heatLayerArray);

    //just to get the bounds of this layer
    var pointLayer = L.geoJson(this.geoJSONData);

    var heatLayer = L.heatLayer(heatLayerArray, {radius: 25});
    console.log(heatLayer);
    // this.map.fitBounds(heatLayer.getBounds());
    this.map.addLayer (heatLayer);
    //zoom to layer
    this.map.fitBounds(pointLayer.getBounds());
  }

}
