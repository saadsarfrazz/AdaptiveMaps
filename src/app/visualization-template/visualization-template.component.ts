import { Component, OnInit, Input } from '@angular/core';
import {ISupportedVisualizationModel} from '../shared/vis-model';

import {SUPPORTED_VISUALIZATIONS_ENUM} from '../shared/supported-maps-enum';

@Component({
  selector: 'app-visualization-template',
  templateUrl: './visualization-template.component.html',
  styleUrls: ['./visualization-template.component.css']
})
export class VisualizationTemplateComponent implements OnInit {
  //this value will be updated from other component
  @Input() visModel : ISupportedVisualizationModel;

  //TODO: this should be a specific visualization 
  //by interface
  public mapVisualization : any;

  constructor() { }

  ngOnInit() {
  }

  getVisualizationName( vis : SUPPORTED_VISUALIZATIONS_ENUM) : string{
    //can display different name here
    return SUPPORTED_VISUALIZATIONS_ENUM[vis];
  }

}
