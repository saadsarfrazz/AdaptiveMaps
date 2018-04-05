import {SUPPORTED_VISUALIZATIONS_ENUM} from './supported-maps-enum';

export interface ISupportedVisualizationModel {
  name : SUPPORTED_VISUALIZATIONS_ENUM
  pathToLogo : string
  description: string 
  enabled ?: boolean
}
