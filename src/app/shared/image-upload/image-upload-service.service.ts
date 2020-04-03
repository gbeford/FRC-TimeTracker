import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadServiceService {

  constructor(private http: HttpClient) { }

  public uploadImage(): Observable<void | {}> {
    // const uploadData = new FormData();
    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // this.http.post('my-backend.com/file-upload', uploadData)
    //   .subscribe(event => {
    //     console.log(event); // handle event here
    //   });
    return null;
  }

}


