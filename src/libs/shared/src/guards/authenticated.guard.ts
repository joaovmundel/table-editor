import { inject, Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    private router = inject(Router)

    canActivate(): boolean {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            return true
        }
        this.router.navigate(['login'])
        return false
    }
}