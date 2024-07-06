import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Todo';
  isLoggedIn= false;
  userDetails:any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.getUserDetails().subscribe(details => {
      this.userDetails = details;
    })
  }

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
