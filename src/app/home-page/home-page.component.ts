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
  options = ExpOption;
  formData = new FormData();
  index!: number;

  finalList: any[] = [];
  // object: { [key: string]: [string] } = {};
  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  uploadForm = this.formbuilder.group({
    link: ['', [Validators.required]],
    expiration: ['', Validators.required],
    email: ['', [Validators.email]],
  });

  // getFilesFromService() {
  //   this.apiService.getFiles().subscribe((data) => {
  //     this.list = data;
  //   });
  // }

  createFileFromService() {
    this.apiService.createFile(this.formData).subscribe();
  }

  inputFileChange(event: Event) {
    this.uploadForm.controls['link'].valueChanges;
    const input = event.target as HTMLInputElement;
    this.index = input.files!.length;
    let fileList = Array.from(input.files!);

    for (let i = 0; i < fileList.length; i++) {
      this.formData.append(`file`, fileList![i]);
      let link = URL.createObjectURL(fileList![i]);
      this.formData.append('link', link);
    }
  }
  displayList(){
    let list = new Array();
    list.push(...this.formData.getAll('file'), this.formData.getAll('link'));
    this.finalList = new Array();
    for (let i = 0; i < list.length - 1; i++) {
       let object = {
        name: list[i].name,
        blob: list[list.length - 1][i],
      };

      this.finalList.push(object);
    }
  }

  selectChange(event: Event) {
    this.uploadForm.controls['expiration'].valueChanges;
    const select = event.target as HTMLSelectElement;
    this.formData.append(`exp`, select.value);
  }

  inputMailChange(event: Event) {
    this.uploadForm.controls['email'].value;
    const input = event.target as HTMLInputElement;
    this.formData.append(`mail`, input.value);
  }
  onSubmit() {
    this.createFileFromService();
    this.displayList();
    this.formData = new FormData();
    this.uploadForm.reset();
  }
}
