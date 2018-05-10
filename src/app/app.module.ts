import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


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
    DotMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
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
