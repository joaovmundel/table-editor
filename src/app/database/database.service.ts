import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  async getDatabases(): Promise<string[]> {
    return Promise.resolve(['db1', 'db2', 'db3']);
  }

  async getTables(database: string): Promise<string[]> {
    const tables: Record<string, string[]> = {
      db1: ['table1', 'table2'],
      db2: ['table3', 'table4'],
      db3: ['table5'],
    };
    return Promise.resolve(tables[database] || []);
  }

  async getColumns(database: string, table: string): Promise<string[]> {
    const cols: Record<string, Record<string, string[]>> = {
      db1: { table1: ['id', 'name', 'value'], table2: ['id', 'title'] },
      db2: { table3: ['id', 'desc'], table4: ['id', 'data'] },
      db3: { table5: ['id', 'col'] },
    };
    return Promise.resolve(cols[database]?.[table] || []);
  }
}
