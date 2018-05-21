import { Component, OnInit } from '@angular/core';
import {BasicMapComponent} from '../basicmap/basicmap.component';

import {DataproviderService} from '../services/dataprovider.service';
import{BasicCalculationsService} from '../services/basic-calculations.service';
import{ColorProviderService} from '../services/color-provider.service';

import {SUPPORTED_VISUALIZATIONS_ENUM} from "../shared/supported-maps-enum";
import {ColumnNames} from '../interfaces/column-names-interface';

import {VisualVariableComponent} from '../visual-variable/visual-variable.component';

@Component({
  selector: 'app-piechart-map',
  templateUrl: './piechart-map.component.html',
  styleUrls: ['./piechart-map.component.css']
})
export class PiechartMapComponent extends BasicMapComponent  implements OnInit {

   constructor(private _dataProviderService : DataproviderService,
              private _basicCalculationsService : BasicCalculationsService,
              private _colorProviderService : ColorProviderService) {                
    super();
    this.geoJSONData =  _dataProviderService.getGeoJSON();
  }

  ngOnInit() {
    console.log("PieChartMap init");
    this.plotBaicMap();
  }

}
