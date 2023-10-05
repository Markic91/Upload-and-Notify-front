import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<any>('http://localhost:8080/files');
  }

  createFile(formData: FormData): Observable<Object> {
     return this.http.post('http://localhost:8080/files', formData);
  }
}
