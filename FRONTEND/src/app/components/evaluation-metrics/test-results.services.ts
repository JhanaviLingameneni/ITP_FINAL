import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestResultsService {
  private testResultsUrl = 'http://localhost:5000/api/v1/runCypress'; // Use your actual backend URL
  private storedResults = 'http://localhost5000/testResults'

  constructor(private http: HttpClient) {}
  
 getStoredResults(): Observable<any>{
  return this.http.get(this.storedResults);

 }
  executeTests(payload:any):Observable<any>{
    return this.http.post(this.testResultsUrl,payload);
  }

}