import { Component, OnInit, EventEmitter,Output } from '@angular/core';


import {DataproviderService} from '../services/dataprovider.service';


import {ColumnNames} from '../interfaces/column-names-interface';

@Component({
  selector: 'app-sel-column-types',
  templateUrl: './sel-column-types.component.html',
  styleUrls: ['./sel-column-types.component.css']
})
export class SelectColumnTypesComponent implements OnInit {


  // this will be updated based on user selection
  columnTypes : ColumnNames[] = [];

  @Output()
  columnTypesSelected = new EventEmitter<boolean>();

  constructor( private _dataProviderService: DataproviderService) { }

  ngOnInit() {
    //initialize columnTypes based on initial column names from data-provider-service
    console.log("sel-col-type initialized");
    var columnNames = this._dataProviderService.getDefaultAttributesNames();
    for (let col of columnNames){
      this.columnTypes.push(
        {
          column_name : col
        }
      );      
    }
  }

  /**
   * Stores the user selection of different kind of
   * data scales for data-columns
   */
  updateValues(){
    //update values in date provider service
    this._dataProviderService.setColumnNamesWithDataScale(this.columnTypes);
    //trigger that step was completed to view the visualizations
    this.columnTypesSelected.emit(true);
  }

}
