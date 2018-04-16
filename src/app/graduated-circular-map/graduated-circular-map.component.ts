import { Component, OnInit } from '@angular/core';

import {MapService} from '../services/map.service';
import {DataproviderService} from '../services/dataprovider.service';

@Component({
  selector: 'app-graduated-circular-map',
  templateUrl: './graduated-circular-map.component.html',
  styleUrls: ['./graduated-circular-map.component.css']
})
export class GraduatedCircularMapComponent implements OnInit {


  constructor(private _mapService : MapService,
              private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    console.log("Graduated Circular init");
    this._mapService.loadGraduatedCircularMap();
  }

  sizeOptionSelected(value){
    console.log("Size variable in GCMap is" + value);
  }

  colorOptionSelected(value){
    console.log("Color variable in GCMap is" + value);
  }

}
