import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpEvent, HttpHeaderResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // getFiles() {
  //   return this.http.get<any>('http://localhost:8080/files');
  // }


  createFile(formData: FormData) {
    return this.http.post('http://localhost:8080/files', formData);
    // const newRequest = new HttpRequest('POST', 'http://localhost:8080/files', formData, {
    //   responseType: 'json',
    //   });
    //   return this.http.request(newRequest);
  }
}
