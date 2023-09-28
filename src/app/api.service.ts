import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toto } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<any>('http://localhost:8080/files');
  }

  createFile(file: Toto) {
    return this.http.post(`http://localhost:8080/files`, file);
  }
}
