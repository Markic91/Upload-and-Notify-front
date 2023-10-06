import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<any>('http://localhost:8080/files');
  }

  createFile(formData: FormData): Observable<HttpEvent<{}>> {
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/files', formData, {
      
      responseType: 'text',
      });
      return this.http.request(newRequest);
    // return this.http.post('http://localhost:8080/files', formData);
  }
}
