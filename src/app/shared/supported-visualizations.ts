import { ISupportedVisualizationModel } from './vis-model';
import {SUPPORTED_VISUALIZATIONS_ENUM} from './supported-maps-enum';
//Hardcoded models here
export const SUPPORTED_VISUALIZATIONS: ISupportedVisualizationModel[] = [
{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Ratio Scale"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP_1,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Nominal Scale"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP_2,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Nice day, cool temps"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.PIE_CHARTMAP,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Nice day, cool temps"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.HEAT_MAP,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Nice day, cool temps"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.DOT_MAP,
  "pathToLogo" : "../../assets/images/img1.png",
  "description" : "Nice day, cool temps"
}
]

//"gpxData": '../../assets/pics/1.jpg'