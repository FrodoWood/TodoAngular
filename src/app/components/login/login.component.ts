import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Logged in successfully!');
          this.router.navigate(['/weather']);
        },
        error: (error) => {
          console.error('Login failed.', error);
        },
      });
  }
}
