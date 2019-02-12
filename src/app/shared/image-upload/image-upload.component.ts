import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageUploadServiceService } from './image-upload-service.service';

// https://medium.freecodecamp.org/how-to-make-image-upload-easy-with-angular-1ed14cb2773b
// https://www.academind.com/learn/angular/snippets/angular-image-upload-made-easy/

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


  onUpload() {
    // this.http is the injected HttpClient
    // this.http.post('my-backend.com/file-upload', this.selectedFile)
    //   .subscribe(...);
  }

}
