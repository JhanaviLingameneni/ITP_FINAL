import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private getTestResultsUrl='http://localhost:5000/api/v1/test-results/latest';

  constructor(private http: HttpClient) {}

  getData(): Observable<ElementData[]> {
    return this.http.get<ElementData[]>(this.apiUrl);
  }

  addData(data: ElementData): Observable<ElementData> {
    return this.http.post<ElementData>(this.apiUrl, data);
  }
  getTestResultsd(): Observable<any> {
    return this.http.get(this.getTestResultsUrl).pipe(
      map((result: any) => {
        console.log('Raw response:', result);
        return result;
      })
    );
  }
}