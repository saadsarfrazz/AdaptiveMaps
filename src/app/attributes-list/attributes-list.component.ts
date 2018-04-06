import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataproviderService} from '../services/dataprovider.service';
@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css']
})
export class AttributesListComponent implements OnInit {

  //represents list of attribute names found in uploaded file
  @Input()
  listOfAttributes : string [];

  @Output()
  valueSelected = new EventEmitter<string>();

  constructor(private _dataProviderService : DataproviderService) { }

  ngOnInit() {
    this.listOfAttributes = this._dataProviderService.getAllAttributesNames();
  }

  private optionSelected(value : string){
    // console.log("value selected in component");
    this.valueSelected.emit(value);

  }

}
