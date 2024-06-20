import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PactDataService {
  private pactData: any[] = [];

  constructor(private http: HttpClient) {}

  getPactData(): any[] {
    return this.pactData;
  }

  addPactData(data: any): void {
    this.pactData.push(data);
    this.triggerPactProcess(data).subscribe();
  }

  triggerPactProcess(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/runContract', data);
  }

  updatePactStatus(id: number, status: string): void {
    const pact = this.pactData.find(p => p.id === id);
    if (pact) {
      pact.status = status;
    }
  }

  getPactResult(id: number): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/runContract');
  }
}