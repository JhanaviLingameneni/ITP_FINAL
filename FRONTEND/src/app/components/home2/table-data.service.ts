import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TableData {
  url: string;
  spec: string;
  env: string;
  status: string;
  lastActivity: string;
  statusColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private tableDataSubject = new BehaviorSubject<TableData[]>([]);
  tableData$ = this.tableDataSubject.asObservable();

  getTableData(): TableData[] {
    return this.tableDataSubject.value;
  }

  setTableData(data: TableData[]): void {
    this.tableDataSubject.next(data);
  }
}