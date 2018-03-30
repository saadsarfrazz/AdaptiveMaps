import { Component , OnInit } from '@angular/core';
import {VisualizationProviderService} from './services/visualization-provider.service';
import {ISupportedVisualizationModel} from './shared/vis-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  visualizationList : ISupportedVisualizationModel[];


  constructor(private _visualizationProviderService: VisualizationProviderService){
  }

  ngOnInit(){
    this.visualizationList = this._visualizationProviderService.getSupportedVisualizations();
  }
}
 