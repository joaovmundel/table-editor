/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DatabaseItem, MenuItem } from '../models/menu.interface';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private readonly http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl;

    getMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${this.API_URL}/menu/items`);
    }

    getDatabases(): Observable<DatabaseItem[]> {
        return this.http.get<DatabaseItem[]>(`${this.API_URL}/menu/databases`);
    }
}
