import { Component , OnInit, ViewChild } from '@angular/core';
import {VisualizationProviderService} from './services/visualization-provider.service';
import {ISupportedVisualizationModel} from './shared/vis-model';

import {SUPPORTED_VISUALIZATIONS_ENUM} from './shared/supported-maps-enum';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  visualizationList : ISupportedVisualizationModel[];

  displayMap : boolean = false;
  displayVisualizationsList : boolean = false;
  displayColumnSelection : boolean = false;

  //this value is sent to map component to trigger drawing of a particular map
  //this value is updated when user clicks on one of the supported visualization
  selectedVisualization : SUPPORTED_VISUALIZATIONS_ENUM; //empty by default

  constructor(private _visualizationProviderService: VisualizationProviderService){
  }

  ngOnInit(){
    this.visualizationList = this._visualizationProviderService.getSupportedVisualizations();
  }

  visualizationSelected(vis : ISupportedVisualizationModel){
    this.displayMap = true;
    console.log("selected : "+vis.name);
    //update map view
    this.selectedVisualization = vis.name;
  }

  /**
   * updates view when new data is selected for visualization
   */
  dataUploadedListener(value:boolean){
    console.log("app.component.datauploadedListener:  " + value);
    if(value == true){
      
      //reset all visualization components
      this.displayColumnSelection = false;
      this.displayMap = false;
      this.displayVisualizationsList = false;
      
      this.displayColumnSelection = true;
    }else{ //TODO: this does not seem to work well
      this.displayColumnSelection = false;
    }
    
    
  }

  columnTypesSelected(value:boolean){
    this.displayVisualizationsList = true;
    this.displayColumnSelection = false;
  }
}
 