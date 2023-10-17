import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { myFile } from '../model';


enum ExpirationOptions {
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
  options = ExpirationOptions;

  files!: myFile[];

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  uploadForm = this.formbuilder.group({
    link: ['', [Validators.required]],
    files: [[] as File[]],
    expiration: ['', Validators.required],
    email: ['', [Validators.email]],
  });

  createFileFromService(formaData: FormData) {
    this.apiService.createFile(formaData).subscribe((data) => {
      this.files = data;
    });
  }

  inputFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.uploadForm.controls.files.setValue([...input.files!]);
  }

  onSubmit() {
    let formData = new FormData();
    for (let file of this.uploadForm.controls.files.value!) {
      formData.append('files', file);
    }
    formData.append('mail', this.uploadForm.controls.email.value!);
    formData.append('exp', this.uploadForm.controls.expiration.value!);
    this.createFileFromService(formData);
    this.uploadForm.reset();
  }

}
