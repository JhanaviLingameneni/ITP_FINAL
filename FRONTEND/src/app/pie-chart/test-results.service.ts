import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestResultsService {
  private testResultsUrl = 'http://localhost:5000/api/v1/runCypress'; // Use your actual backend URL
  private getTestResultsUrl='http://localhost:5000/test-results';

  constructor(private http: HttpClient) {}

  getTestResults(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {}; // Empty body if backend doesn't need specific data
    return this.http.post(this.testResultsUrl, body, { headers }).pipe(
      map((result: any) => {
        return {
          labels: ['Passed', 'Failed', 'Pending', 'Skipped'],
          data: [result.TotalPassed, result.TotalFailed, result.TotalPending, result.TotalSkipped]
        };
      })
    );
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