import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//angular bootstrap directive
//https://github.com/ng-bootstrap/ng-bootstrap#demo
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DndModule} from 'ng2-dnd';
import { ScrollToModule } from 'ng2-scroll-to-el';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { VisualizationTemplateComponent } from './visualization-template/visualization-template.component';

import {VisualizationProviderService} from './services/visualization-provider.service';
import {DataproviderService} from './services/dataprovider.service';
import {BasicCalculationsService} from './services/basic-calculations.service';
import {ColorProviderService} from './services/color-provider.service'

import { ChoroplethMapComponent } from './choropleth-map/choropleth-map.component';
import { GraduatedCircularMapComponent } from './graduated-circular-map/graduated-circular-map.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { BasicMapComponent } from './basicmap/basicmap.component';
import { SelectColumnTypesComponent } from './sel-column-types/sel-column-types.component';
import { DotMapComponent } from './dot-map/dot-map.component';
import { HeatMapComponent } from './heat-map/heat-map.component';

import { MapDimensionsComponent } from './map-dimensions/map-dimensions.component';
import { VisualVariableComponent } from './visual-variable/visual-variable.component';
import { PiechartMapComponent } from './piechart-map/piechart-map.component';
import { VisualVariableMultidropComponent } from './visual-variable-multidrop/visual-variable-multidrop.component';
import { HeaderNavBarComponent } from './header-nav-bar/header-nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadfileComponent,
    VisualizationTemplateComponent,
    ChoroplethMapComponent,
    GraduatedCircularMapComponent,
    AttributesListComponent,
    BasicMapComponent,
    SelectColumnTypesComponent,
    DotMapComponent,
    HeatMapComponent,
    MapDimensionsComponent,
    VisualVariableComponent,
    PiechartMapComponent,
    VisualVariableMultidropComponent,
    HeaderNavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [
    VisualizationProviderService,
    DataproviderService,
    BasicCalculationsService,
    ColorProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
