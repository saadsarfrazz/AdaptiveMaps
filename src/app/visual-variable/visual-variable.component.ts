import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import {ColumnNames} from '../interfaces/column-names-interface';

@Component({
  selector: 'app-visual-variable',
  templateUrl: './visual-variable.component.html',
  styleUrls: ['./visual-variable.component.css']
})
export class VisualVariableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Visual variable init for Title : " + this.title);
  }

  @Input()
  title : string = "Default Name" ;

  @Output()
  valueSelected = new EventEmitter<ColumnNames>();

  //just to display name
  //could be reset when mutual exclusive 
  @Input()
  attributeSelected : string ;
  // transferData: Object = {id: 1, msg: 'Hello'};
  // receivedData: Array<any> = [];

  transferDataSuccess($event: any) {
    console.log($event.dragData);
    this.attributeSelected = $event.dragData.column_name;
    this.valueSelected.emit($event.dragData);

      // this.receivedData.push($event);
  }


}
