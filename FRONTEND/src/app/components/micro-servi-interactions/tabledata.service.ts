import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private tableData: any[] = [];

  getTableData() {
    return this.tableData;
  }

  addTableData(row: any) {
    this.tableData.push(row);
  }
}