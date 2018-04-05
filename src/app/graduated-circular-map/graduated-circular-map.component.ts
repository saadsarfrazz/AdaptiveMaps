import { Component, OnInit } from '@angular/core';

import {MapService} from '../services/map.service';
import {DataproviderService} from '../services/dataprovider.service';

@Component({
  selector: 'app-graduated-circular-map',
  templateUrl: './graduated-circular-map.component.html',
  styleUrls: ['./graduated-circular-map.component.css']
})
export class GraduatedCircularMapComponent implements OnInit {

  listOfAttributes : string[];

  constructor(private _mapService : MapService,
              private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    console.log("Choropleth init");
    this._mapService.loadGraduatedCircularMap();
    // this.listOfAttributes = this._dataProviderService.getAllAttributesNames();
  }

}
