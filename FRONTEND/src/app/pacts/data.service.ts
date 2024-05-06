import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PactData } from '../interfaces/pact';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/v1/runContract';

  constructor(private http: HttpClient) { }

  getPactData(): Observable<PactData> {
    return this.http.post<PactData>(this.apiUrl, {
      consumer: "auth-oidc",
      producer: "org",
      
    });
  }
}
