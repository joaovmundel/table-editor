import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ]
})
export class LoginComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup;
    hidePassword = true;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                    this.router.navigate(['/home']);
                },
                error: (error) => {
                    console.error('Login failed:', error);
                }
            });
            console.log('Login data:', this.loginForm.value);
        }
    }
}
