import { Component, OnInit, Input } from '@angular/core';
import {DataproviderService} from '../services/dataprovider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

@Component({
  selector: 'app-map-dimensions',
  templateUrl: './map-dimensions.component.html',
  styleUrls: ['./map-dimensions.component.css']
})
export class MapDimensionsComponent implements OnInit {

  constructor(private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    console.log("MAP Dimensions: Attrbute list initializaed for visualizationType : " + this.visualizationType);
    this.listOfAttributes = this._dataProviderService.getAllAttributesNames(this.visualizationType);
    console.log("Attrbute list init with : " );
    console.log(this.listOfAttributes);
  }

  //must be init with a particular type of map from SUPPORTED_VISUALIZATIONS_ENUM
  //value is then used to get the related columns for this visualizationType
  @Input()
  visualizationType : SUPPORTED_VISUALIZATIONS_ENUM;

  //represents list of attribute names found in uploaded file
  listOfAttributes : ColumnNames [];

  listOfVisualVariables : string [];

  

}
