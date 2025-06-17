import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { DatabaseItem, MenuItem } from '../../models/menu.interface';
import { MenuService } from '../../services/menu.service';
import { Subject, takeUntil } from 'rxjs';

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
        RouterModule
    ]
})
export class SidebarComponent implements OnInit, OnDestroy {
    private menuService = inject(MenuService)
    private readonly _destroy$ = new Subject<void>();

    menuItems: MenuItem[] = [];
    databases: DatabaseItem[] = [];
    expandedDatabases: Set<string> = new Set();


    ngOnInit(): void {
        this.menuService.getMenuItems().pipe(takeUntil(this._destroy$)).subscribe(items => this.menuItems = items);
        this.menuService.getDatabases().pipe(takeUntil(this._destroy$)).subscribe(data => this.databases = data);
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

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
