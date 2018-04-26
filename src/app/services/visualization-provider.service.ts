import { Injectable } from '@angular/core';
import {SUPPORTED_VISUALIZATIONS} from '../shared/supported-visualizations';
import { ISupportedVisualizationModel } from '../shared/vis-model';

import {ValidVisualizations} from '../interfaces/valid-visualizations-interface';

@Injectable()
export class VisualizationProviderService {

  //contains final information regarding display of supported
  //visualizations. Will be intialized based on static SUPPORTED_VISUALIZATIONS
  //and then applicable visualizations will be updated based on information from 
  //dataprovider.service, once data is uploaded.
  private supportedVisualizations: ISupportedVisualizationModel[] = SUPPORTED_VISUALIZATIONS.slice(0);

  constructor() { }

  /**
   * This method updates the static visulaization information by 
   * marking the visualization.enabled as true based on names 
   * that are found in the argument list
   */
  public updateVisualizationInformation(validVisualizations : ValidVisualizations){
    //get a copy of static visualizations
    // this.supportedVisualizations = SUPPORTED_VISUALIZATIONS.slice(0);
    for(let validViz of validVisualizations.detectedVisualizations){
      console.log("Detected visualization is : " + validViz);
      for(let visualization of this.supportedVisualizations ){
        if(visualization.name == validViz){
          visualization.enabled = true;
        }
      }
    }

  }

  getSupportedVisualizations(){
    //copy of supported visualizations
    return this.supportedVisualizations;
  }

}
