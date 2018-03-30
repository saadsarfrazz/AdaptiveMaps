import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

import {MapService} from './services/map.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
