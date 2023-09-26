import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  constructor(private formbuilder: FormBuilder){}

  uploadForm = this.formbuilder.group({
    email: ["", [Validators.email]],
    link: ["", [Validators.required]],
    expiration: ["", [Validators.required]]
  })

  submit(){
    console.log("coucou");
    
  }

}