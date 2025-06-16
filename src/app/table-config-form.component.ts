import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from './database/database.service';
import { Roles } from './roles.enum';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table-config-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    NgFor,
  ],
  templateUrl: './table-config-form.component.html',
  styleUrl: './table-config-form.component.scss',
})
export class TableConfigFormComponent implements OnInit {
  roles = Object.values(Roles);
  databases: string[] = [];
  tables: string[] = [];
  columns: string[] = [];

  form = new FormGroup({
    database: new FormControl(''),
    table: new FormControl(''),
    editableColumns: new FormControl<string[]>([]),
    viewColumns: new FormControl<string[]>([]),
    dataType: new FormControl(''),
    roles: new FormControl<string[]>([]),
  });

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.loadDatabases();
    this.form
      .get('database')!
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => {
          this.tables = [];
          this.form.get('table')!.reset();
        }),
        switchMap((db) => (db ? this.dbService.getTables(db) : of([])))
      )
      .subscribe((tables) => (this.tables = tables));

    this.form
      .get('table')!
      .valueChanges.pipe(
        debounceTime(300),
        switchMap((table) => {
          const db = this.form.get('database')!.value;
          return db && table ? this.dbService.getColumns(db, table) : of([]);
        })
      )
      .subscribe((cols) => (this.columns = cols));
  }

  private async loadDatabases() {
    this.databases = await this.dbService.getDatabases();
  }
}
