/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { DatabaseItem, MenuItem } from '../../models/menu.interface';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatDividerModule,
        MatExpansionModule,
        MatListModule,
        MatSidenavModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class SidebarComponent implements OnInit, OnDestroy {
    private menuService = inject(MenuService);
    private router = inject(Router);
    private readonly _destroy$ = new Subject<void>();

    menuItems: MenuItem[] = [];
    databases: DatabaseItem[] = [];
    filteredDatabases: DatabaseItem[] = [];
    expandedDatabases: Set<string> = new Set();

    searchControl = new FormControl<string | null>('');
    tableSearchControls = new Map<string, FormControl<string | null>>();

    ngOnInit(): void {
        this.menuService.getMenuItems()
            .pipe(takeUntil(this._destroy$))
            .subscribe(items => this.menuItems = items);

        this.menuService.getDatabases()
            .pipe(takeUntil(this._destroy$))
            .subscribe(data => {
                this.databases = data;
                this.filteredDatabases = data;

                data.forEach(db => {
                    this.tableSearchControls.set(db.database, new FormControl<string | null>(''));
                });
            });

        this.searchControl.valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                takeUntil(this._destroy$)
            )
            .subscribe(searchText => {
                const term = (searchText || '').toLowerCase();
                this.filteredDatabases = this.databases.filter(db =>
                    db.database.toLowerCase().includes(term)
                );
            });
    }

    toggleDatabase(database: string): void {
        if (this.expandedDatabases.has(database)) {
            this.expandedDatabases.delete(database);
        } else {
            this.expandedDatabases.add(database);
        }
    }

    isExpanded(database: string): boolean {
        return this.expandedDatabases.has(database);
    }

    navigate(path: string): void {
        this.router.navigate([path]);
    }

    getFilteredTables(db: DatabaseItem): { name: string }[] {
        const control = this.getTableSearchControl(db.database);
        const searchText = (control.value || '').toLowerCase();
        return db.tables.filter(table => table.name.toLowerCase().includes(searchText));
    }

    getTableSearchControl(database: string): FormControl<string | null> {
        // Garantindo que nunca retorne undefined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.tableSearchControls?.get(database)!;
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
