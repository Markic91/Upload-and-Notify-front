import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myFile } from './model';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  // getFiles() {
  //   return this.http.get<any>('http://localhost:8080/files');
  // }


  createFile(formData: FormData): Observable<myFile[]> {
    return this.http.post<myFile[]>('http://localhost:8080/files', formData);
    // const newRequest = new HttpRequest('POST', 'http://localhost:8080/files', formData, {
    //   responseType: 'json',
    //   });
    //   return this.http.request(newRequest);
  }
}
