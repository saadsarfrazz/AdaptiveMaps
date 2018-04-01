import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';
import {DataproviderService} from '../services/dataprovider.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  listOfAttributes : string[];

  featuresTOMap : any;

  constructor(private _mapService : MapService,
              private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    this._mapService.plotMap();

    this.listOfAttributes = this._dataProviderService.getAllAttributesNames();
  }

  public updateMapDisplay(selectedValue : string){
    console.log('map update invoked' + selectedValue);
    this._mapService.updateMap(selectedValue);
  }

}
