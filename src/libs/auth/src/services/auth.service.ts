/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'token'
    private readonly _http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl;

    login(credentials: { username: string; password: string }): Observable<{ token: string }> {
        return this._http.post<{ token: string }>(`${this.API_URL}/token`, credentials).pipe(
            tap(response => {
                localStorage.setItem(this.tokenKey, response.token)
            })
        )
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey)
    }
}