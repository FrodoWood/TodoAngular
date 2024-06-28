import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WeatherComponent } from './components/weather/weather.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoitemsComponent } from './components/todoitems/todoitems.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'todo', component: TodoitemsComponent },
  { path: '**', redirectTo: '/login' },
];
