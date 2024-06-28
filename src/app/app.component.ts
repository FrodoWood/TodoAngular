import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Todo';

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Successfully logged out!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed.', error);
      },
    });
  }
}
