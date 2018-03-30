import { Injectable } from '@angular/core';
import {SUPPORTED_VISUALIZATIONS} from '../shared/supported-visualizations';

@Injectable()
export class VisualizationProviderService {

  // private visualizationList : VisualizationTemplateComponent[] = new Array();

  constructor() { }

  getSupportedVisualizations(){
    //copy of supported visualizations
    return SUPPORTED_VISUALIZATIONS.slice(0);
  }


  // /**
  //  * Generates all visualizations.
  //  * 
  //  */
  // public generateVisualizations() : VisualizationTemplateComponent[]{
  //   let visualization = new VisualizationTemplateComponent();
  //   visualization.name = "First Visualization";
  //   visualization.pathToLogo = "Some path here";

  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   this.visualizationList.push(visualization);
  //   return this.visualizationList;

  // }

}
