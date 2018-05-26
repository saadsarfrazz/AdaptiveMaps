import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {ColumnNames} from '../interfaces/column-names-interface';
import {VALID_DATA_SCALE_ENUM} from '../shared/valid-data-scales';

@Component({
  selector: 'app-visual-variable-multidrop',
  templateUrl: './visual-variable-multidrop.component.html',
  styleUrls: ['./visual-variable-multidrop.component.css']
})
export class VisualVariableMultidropComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  title : string = "Default Name" ;

  /** 
   * This set the datatype which can be accepted
   * by this visual variable. Other other data types will
   * be ignored. e.g. nominal . Type of each dropped data
   * will be checked and only matched type will be selected
   */
  @Input()
  acceptsDataType : VALID_DATA_SCALE_ENUM;

  @Output()
  valueSelected = new EventEmitter<ColumnNames[]>();

  //just to display name
  //could be reset when mutual exclusive with 
  //some other visual variable
  @Input()
  attributeSelectedList : ColumnNames[] = [];
  // transferData: Object = {id: 1, msg: 'Hello'};
  // receivedData: Array<any> = [];

  transferDataSuccess($event: any) {
    var column = $event.dragData 
    // console.log($event.dragData);
    if($event.dragData.type ==VALID_DATA_SCALE_ENUM[this.acceptsDataType] ){
      this.attributeSelectedList.push(column);
      this.valueSelected.emit(this.attributeSelectedList);
    }
  }

  removeThis(attribute : ColumnNames){
    //remove this attribute
    this.attributeSelectedList = this.attributeSelectedList.filter(function(e1){
      return e1.column_name != attribute.column_name;
    });
    this.valueSelected.emit(this.attributeSelectedList);
  }

}
