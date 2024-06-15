import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ElementData {
  url: string;
  spec: string;
  env: string;
  status: string;
  lastActivity: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/v1/runCypress'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getData(): Observable<ElementData[]> {
    return this.http.get<ElementData[]>(this.apiUrl);
  }

  addData(data: ElementData): Observable<ElementData> {
    return this.http.post<ElementData>(this.apiUrl, data);
  }
}