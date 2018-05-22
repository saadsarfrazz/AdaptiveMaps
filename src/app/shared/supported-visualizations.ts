import { ISupportedVisualizationModel } from './vis-model';
import {SUPPORTED_VISUALIZATIONS_ENUM} from './supported-maps-enum';
//Hardcoded models here
export const SUPPORTED_VISUALIZATIONS: ISupportedVisualizationModel[] = [
{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.CHOROPLETH_MAP,
  "pathToLogo" : "../../assets/images/choropleth_map.png",
  "description" : "Data Scale: Nominal/Ratio"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.GRADUATED_CIRCULAR_MAP,
  "pathToLogo" : "../../assets/images/gc_map.png",
  "description" : "Data Scale: Ratio & Nominal/Ratio"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.PIE_CHARTMAP,
  "pathToLogo" : "../../assets/images/pie_chart.png",
  "description" : "Data Scale: Ratio & Ratio"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.HEAT_MAP,
  "pathToLogo" : "../../assets/images/heat_map.png",
  "description" : "N/A"
},{
  "name" : SUPPORTED_VISUALIZATIONS_ENUM.DOT_MAP,
  "pathToLogo" : "../../assets/images/dot_map.png",
  "description" : "Data Scale: Nominal/Interval"
}
]

//"gpxData": '../../assets/pics/1.jpg'