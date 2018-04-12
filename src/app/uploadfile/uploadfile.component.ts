import { Component, OnInit } from '@angular/core';

import {DataproviderService} from '../services/dataprovider.service';
import {EXAMPLE_JSON_POLY} from '../shared/example-geojson-polygon';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  viewUploadFile : boolean = true;
  viewExampleData : boolean = false;

  listOfExampleDataNames : string[]= ["US Population Density","Some other Map here",
                                       "Some other Map here"];

  constructor(private _dataProviderService : DataproviderService) { }

  ngOnInit() {
  }

  fileChange(event) {
      console.log("File loaded");
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
         
          var reader = new FileReader();
          reader.onload = (e) =>{
            var text = reader.result;
            // console.log(text);
            // this._dataProviderService.mapData = text;
            //text will required to be converted to json
            this._dataProviderService.geoJSONData = JSON.parse(text);
          }
          reader.readAsText(file);
          
      }
  }

  loadExampleData(data: string){
    //TODO : can be improced so that we don't have hardcoded values 
    if(data == "US Population Density"){
      console.log("data selected");
      this._dataProviderService.geoJSONData = JSON.stringify(EXAMPLE_JSON_POLY);
    }
  }

}
