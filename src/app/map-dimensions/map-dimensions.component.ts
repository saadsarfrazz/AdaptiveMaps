import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-dimensions',
  templateUrl: './map-dimensions.component.html',
  styleUrls: ['./map-dimensions.component.css']
})
export class MapDimensionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  transferData: Object = {id: 1, msg: 'Hello'};
    receivedData: Array<any> = [];

    transferDataSuccess($event: any) {
        this.receivedData.push($event);
    }

}
