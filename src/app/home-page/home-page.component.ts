import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

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
  // link: unknown;
  emailControl?: string;
  files: FormData = new FormData();
  index!: number;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  uploadForm = this.formbuilder.group({
    link: ['', [Validators.required]],
    expiration: ['', [Validators.required]],
    email: [this.emailControl, [Validators.email]],
  });

  getFilesFromService() {
    this.apiService.getFiles().subscribe((data) => {
      this.files = data;
    });
  }

  createFileFromService() {
    this.apiService.createFile(this.files).subscribe();
  }
  inputFileChange(event: Event) {
    this.uploadForm.controls['link'].valueChanges;
    const input = event.target as HTMLInputElement;
    this.index = input.files!.length;
    for (let i = 0; i < input.files!.length; i++) {
      let blobUrl = URL.createObjectURL(input.files![i]);
      let blobName = input.files![i].name;

      this.files.append(`blob${i}`, blobName);
      this.files.append(`blob${i}`, blobUrl);
    }
  }

  selectChange(event: Event) {
    this.uploadForm.controls['expiration'].valueChanges;
    const select = event.target as HTMLSelectElement;
    for (let i = 0; i < this.index; i++) {
      this.files.append(`blob${i}`, select.value);
    }
  }
  inputMailChange(event: Event) {
    this.uploadForm.controls['email'].value;
    const input = event.target as HTMLInputElement;
    for (let i = 0; i < this.index; i++) {
      this.files.append(`blob${i}`, input.value);
    }
  }
  onSubmit() {
    for (let i = 0; i < this.index; i++) {
      console.log(this.files.getAll(`blob${i}`));
    }

    this.createFileFromService();
    for (let i = 0; i < this.index; i++) {
      this.files.delete(`blob${i}`);
    }
    this.uploadForm.reset();
  }
}