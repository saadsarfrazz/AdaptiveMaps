import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataproviderService} from '../services/dataprovider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';
@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css']
})
export class AttributesListComponent implements OnInit {

  //must be init with a particular type of map from SUPPORTED_VISUALIZATIONS_ENUM
  //value is then used to get the related columns for this visualizationType
  @Input()
  visualizationType : SUPPORTED_VISUALIZATIONS_ENUM;
  
  //represents list of attribute names found in uploaded file
  listOfAttributes : ColumnNames [];

  @Output()
  valueSelected = new EventEmitter<ColumnNames>();

  constructor(private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    console.log("Attrbute list initializaed for visualizationType : " + this.visualizationType);
    this.listOfAttributes = this._dataProviderService.getAllAttributesNames(this.visualizationType);
    console.log("Attrbute list init with : " );
    console.log(this.listOfAttributes);
  }

  private optionSelected(value : ColumnNames){
    // console.log("value selected in component");
    this.valueSelected.emit(value);

  }

}
