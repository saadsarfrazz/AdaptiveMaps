import { Component, OnInit } from '@angular/core';

import {MapService} from '../services/map.service';
import {DataproviderService} from '../services/dataprovider.service';

@Component({
  selector: 'app-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css']
})
export class ChoroplethMapComponent implements OnInit {

  listOfAttributes : string[];
  
  constructor(private _mapService : MapService,
              private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    console.log("Choropleth init");
    this._mapService.plotBaicMap();
    this.listOfAttributes = this._dataProviderService.getAllAttributesNames();
  }

  // public initMap(){
    
  // }
}
