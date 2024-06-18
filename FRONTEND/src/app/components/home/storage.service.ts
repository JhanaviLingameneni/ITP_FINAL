import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('localStorage is not available');
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } else {
      console.error('localStorage is not available');
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      console.error('localStorage is not available');
    }
  }
}