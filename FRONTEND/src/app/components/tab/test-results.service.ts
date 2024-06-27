import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestResultsService {
  private apiUrl1 = 'http://localhost:5000/api/v1/test-results/latest?limit=1';
  private apiUrl10 = 'http://localhost:5000/api/v1/test-results/latest?limit=10';

  constructor(private http: HttpClient) {}

  getLatestResult(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }

  getLastTenResults(): Observable<any> {
    return this.http.get<any>(this.apiUrl10);
  }
}