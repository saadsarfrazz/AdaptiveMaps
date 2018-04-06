import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { VisualizationTemplateComponent } from './visualization-template/visualization-template.component';

import {MapService} from './services/map.service';
import {VisualizationProviderService} from './services/visualization-provider.service';
import {DataproviderService} from './services/dataprovider.service';
import { ChoroplethMapComponent } from './choropleth-map/choropleth-map.component';
import { GraduatedCircularMapComponent } from './graduated-circular-map/graduated-circular-map.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadfileComponent,
    VisualizationTemplateComponent,
    ChoroplethMapComponent,
    GraduatedCircularMapComponent,
    AttributesListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MapService,
    VisualizationProviderService,
    DataproviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
