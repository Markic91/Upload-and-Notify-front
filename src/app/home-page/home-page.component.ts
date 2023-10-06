import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { KeyValuePipe } from '@angular/common';

enum ExpOption {
  A = '1 jour',
  B = '1 mois',
  C = '1 an',
  D = 'Jamais',
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  options: Object = ExpOption;
  // link!: FileList;
  formData = new FormData();
  index!: number;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  uploadForm = this.formbuilder.group({
    link: ['', [Validators.required]],
    expiration: ['',Validators.required],
    email: ['', [Validators.email]],
  });

  getFilesFromService() {
    this.apiService.getFiles().subscribe((data) => {
      this.formData = data;
    });
  }

  createFileFromService() {
    this.apiService.createFile(this.formData).subscribe();
  }
  inputFileChange(event: Event) {
    this.uploadForm.controls['link'].valueChanges;
    const input = event.target as HTMLInputElement;
    this.index = input.files!.length;
    let fileList = input.files!;
   
    
    for (let i = 0; i < fileList!.length; i++) {
      let blobUrl = URL.createObjectURL(fileList![i]);
      this.formData.append(`file`,  fileList![i] );
      this.formData.append('file', blobUrl);
     
    }
  
   
    console.log(fileList);
  }

  selectChange(event: Event) {
    this.uploadForm.controls['expiration'].valueChanges;
    const select = event.target as HTMLSelectElement;
    // for (let i = 0; i < this.index; i++) {
      this.formData.append(`file`, select.value);
    // }
  }

  inputMailChange(event: Event) {
    this.uploadForm.controls['email'].value;
    const input = event.target as HTMLInputElement;
    // for (let i = 0; i < this.index; i++) {
      this.formData.append(`file`, input.value);
    // }
  }
  onSubmit() {
    // for (let i = 0; i < this.index; i++) {
    for (let value of this.formData.values()) {
      console.log(value);
    }

    this.createFileFromService();
    for (let i = 0; i < this.index; i++) {
      this.formData.delete(`file`);
    }
    this.uploadForm.reset();
  }
}
