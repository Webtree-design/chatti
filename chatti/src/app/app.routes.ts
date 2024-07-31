import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BeitraegeComponent } from './components/beitraege/beitraege.component';
import { authGuard } from './guards/auth.guard';
import { AddArtikelComponent } from './components/flowbite/add-artikel/add-artikel.component';
import { EditArtikelComponent } from './components/flowbite/edit-artikel/edit-artikel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'posts', component: BeitraegeComponent, canActivate: [authGuard] },
  { path: 'add-artikel', component: AddArtikelComponent, canActivate: [authGuard] }, 
  { path: 'edit-artikel/:id', component: EditArtikelComponent, canActivate: [authGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'home' },
];

export const appRoutingProviders: any[] = [];

export const routing = provideRouter(routes);
