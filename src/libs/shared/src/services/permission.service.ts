/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPermission } from '../models/permissions.interface';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private readonly _http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl;

    createPermission(permission: IPermission): Observable<IPermission> {
        return this._http.post<IPermission>(`${this.API_URL}/permissions`, permission);
    }

    addUserPermission(userId: string, permission: IPermission): Observable<IPermission> {
        return this._http.post<IPermission>(`${this.API_URL}/permissions/user/${userId}`, permission);
    }

    removeUserPermission(userId: string, permissionId: string): Observable<void> {
        return this._http.delete<void>(`${this.API_URL}/permissions/user/${userId}/${permissionId}`);
    }

    getExistentPermissions(): Observable<IPermission[]> {
        return this._http.get<IPermission[]>(`${this.API_URL}/permissions`);
    }

}