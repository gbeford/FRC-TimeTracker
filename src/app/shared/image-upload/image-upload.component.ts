import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageUploadServiceService } from './image-upload-service.service';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  selectedFile: File;
  filename: string;

  constructor(private imageService: ImageUploadServiceService) { }

  processFile(event) {

    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.filename = this.selectedFile.name;
  }


  // onUpload() {
  //   // this.http is the injected HttpClient
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.http.post('my-backend.com/file-upload', uploadData)
  //     .subscribe(event => {
  //       console.log(event); // handle event here
  //     });
  // }

}
