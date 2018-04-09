import { Component, OnInit } from '@angular/core';


declare var L: any;

const defaultCoords: number[] = [52.381685,4.890248]
const defaultZoom: number = 8

@Component({
  selector: 'app-basicmap',
  templateUrl: './basicmap.component.html',
  styleUrls: ['./basicmap.component.css']
})
export class BasicMapComponent implements OnInit {

  map : any;

  constructor() { }

  ngOnInit() {
    // this.plotBaicMap();
  }

  public plotBaicMap(){
    this.map = L.map('map').setView(defaultCoords, defaultZoom);

    this.map.maxZoom = 100;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    
  }

}
