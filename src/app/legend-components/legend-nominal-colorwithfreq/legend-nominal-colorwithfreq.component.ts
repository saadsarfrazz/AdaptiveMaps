import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-legend-nominal-colorwithfreq',
  templateUrl: './legend-nominal-colorwithfreq.component.html',
  styleUrls: ['./legend-nominal-colorwithfreq.component.css']
})
export class LegendNominalColorwithfreqComponent implements OnInit {

  @Input()
  legendTitle : string;

  //json object containing unique attribute value as key and object of their frequency
  //and color as values. Is init using calculation service for given selected
  //attribute of type nominal
  //e.g. { attributevalue1: {freq:3,color:"rgb(10,10,10)"}}
  @Input()
  private nominalValuesFreqAndColor : any;
  //nominal keys
  @Input()
  nominalKeysForLegend : string[];

  constructor() { }

  ngOnInit() {
    console.log("legend-nominal-colorwithfreq init");
  }

}
