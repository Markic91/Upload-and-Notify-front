import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { Toto } from '../model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  files: Toto[] = [];
  file!: Toto;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  uploadForm = this.formbuilder.group({
    email: ['', [Validators.email]],
    link: ['', [Validators.required]],
    expiration: ['', [Validators.required]],
  });

  getFilesFromService() {
    this.apiService.getFiles().subscribe((data) => {
      this.files = data;
    });
  }

  createFileFromService() {
    this.apiService.createFile(this.file).subscribe((data) => (data));
  }

  onSubmit() {
    this.file = {
      link: this.uploadForm.value.link,
      expiration: this.uploadForm.value.expiration,
    } as Toto;
    this.createFileFromService();
  }
  
}
