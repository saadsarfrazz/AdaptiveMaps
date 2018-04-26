import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
export interface ValidVisualizations{
    dataType: string,
    detectedVisualizations : SUPPORTED_VISUALIZATIONS_ENUM [];
}