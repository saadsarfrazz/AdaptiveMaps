import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-legend-numeric-colorwithboundary',
  templateUrl: './legend-numeric-colorwithboundary.component.html',
  styleUrls: ['./legend-numeric-colorwithboundary.component.css']
})
export class LegendNumericColorwithboundaryComponent implements OnInit {

  @Input()
  legendTitle : string;

  //stores the boundary values for different classes of ratioData
  //e.g. 0-100 with 5 classes contain values [20,40,60,80,100]
  //it will be used to assign different colors to circles
  @Input()
  colorBoundaryArray : number[];

  @Input()
  ratioColorsList : string[];

  constructor() { }

  ngOnInit() {
    console.log("legend-numeric-colorwithbound init");
  }

}
