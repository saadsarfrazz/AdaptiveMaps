import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileChange(event) {
      console.log("File loaded");
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
         
          var reader = new FileReader();
          reader.onload = function(e) {
          var text = reader.result;
            console.log(text);
          }
          reader.readAsText(file);
          
          // let formData:FormData = new FormData();
          // formData.append('uploadFile', file, file.name);
          // let headers = new Headers();
          // /** No need to include Content-Type in Angular 4 */
          // headers.append('Content-Type', 'multipart/form-data');
          // headers.append('Accept', 'application/json');
          // let options = new RequestOptions({ headers: headers });
          // this.http.post(`${this.apiEndPoint}`, formData, options)
          //     .map(res => res.json())
          //     .catch(error => Observable.throw(error))
          //     .subscribe(
          //         data => console.log('success'),
          //         error => console.log(error)
          //     )
      }
  }

}
