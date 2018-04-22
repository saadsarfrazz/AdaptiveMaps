import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadfileComponent,
    VisualizationTemplateComponent,
    ChoroplethMapComponent,
    GraduatedCircularMapComponent,
    AttributesListComponent,
    BasicMapComponent
  ],
  imports: [
    BrowserModule
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
