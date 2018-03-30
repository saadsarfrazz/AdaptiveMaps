import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
