import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { File } from '../model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent {

  files: File[] = [];
  test!: string;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getFilesFromService()
  }

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

  // createFileFromService() {
  //   this.apiService.createFile(uploadForm).subscribe;
  // }

  onSubmit() {
    console.log(this.uploadForm.value);
  }
  
}
