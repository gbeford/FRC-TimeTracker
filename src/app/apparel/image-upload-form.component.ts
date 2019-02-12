import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ImageUploadServiceService } from 'app/shared/image-upload/image-upload-service.service';
import { ClothingService } from './clothing.service';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.scss']
})
export class ImageUploadFormComponent implements OnInit {

  ImageForm: FormGroup;
  private selectedFile: File;
  filename: string;
  imageName: string;


  constructor(private formBuilder: FormBuilder,
    private imageService: ImageUploadServiceService,
    private clothingService: ClothingService) { }

  ngOnInit() {
    this.createForm();
  }

  uploadNotify() {
    alert('image was selected');
  }

  createForm() {
    this.ImageForm = this.formBuilder.group({
      itemCtrl: ['', [<any>Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.ImageForm.controls; }


  processFile(event) {
    this.selectedFile = <File>event.target.files[0];
    this.filename = this.selectedFile.name;
  }


  saveUploadedImage() {
    if (this.ImageForm.valid) {
      this.imageName = this.ImageForm.value.itemCtrl;

      const uploadData = new FormData();
      uploadData.append(this.imageName, this.selectedFile, this.filename);

      this.clothingService.saveImage(uploadData);
    }
  }



}
