import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestResultsService {
  private testResultsUrl = 'http://localhost:5000/api/v1/runCypress'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }

  executeTests(payload: any): Observable<any> {
    return this.http.post<any>(this.testResultsUrl, payload);
  }
}