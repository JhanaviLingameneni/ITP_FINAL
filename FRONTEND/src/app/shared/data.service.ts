// src/app/shared/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private pactData = new BehaviorSubject<{ consumer: string; producer: string }>({ consumer: '', producer: '' });
  pactData$ = this.pactData.asObservable();

  constructor() {}

  updatePactData(consumer: string, producer: string) {
    this.pactData.next({ consumer, producer });
  }
}


    