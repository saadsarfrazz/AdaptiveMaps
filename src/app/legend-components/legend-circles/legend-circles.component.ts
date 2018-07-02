import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-legend-circles',
  templateUrl: './legend-circles.component.html',
  styleUrls: ['./legend-circles.component.css']
})
export class LegendCirclesComponent implements OnInit {

  @Input()
  legendTitle : string;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [0,20,40,60,80,100]
  @Input()
  boundaryArray : number[];

  //A hard coded sized fro 5 classes of GC maps
  // @Input()
  circleSizesArray : number[] = [10,20,30,40,50,60,70];

  constructor() { 
    console.log("legend-circle init ");

  }

  ngOnInit() {
  }

}
