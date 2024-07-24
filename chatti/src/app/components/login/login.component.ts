import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  user = {
    identity: '',
    password: '',
  };

  pb = new PocketBase('https://pocket.webtree-design.de');
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged = true;
  }

  ngOnInit() {
    this.redirect();
  }

  redirect() {
    if (this.authService.isLogged) {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit() {
    this.error = null;
    try {
      const authData = await this.pb
        .collection('users')
        .authWithPassword(this.user.identity, this.user.password);
      console.log('User logged in successfully', authData);
      this.router.navigate(['/home']); // Redirect to protected route
    } catch (error: any) {
      console.error('Error logging in', error);
      this.error =
        error?.response?.data?.message ||
        'Login failed. Please check your credentials and try again.';
    }
  }

  async loginWithOAuth2(provider: string) {
    try {
      const authData = await this.pb
        .collection('users')
        .authWithOAuth2({ provider });
      console.log('User logged in successfully via OAuth2', authData);
      this.router.navigate(['/home']); // Redirect to protected route
    } catch (error: any) {
      console.error('OAuth2 login failed', error);
      this.error = 'OAuth2 Login failed. Please try again.';
    }
  }

  public toggleRegister() {
    this.authService.toggleRegister();
  }
}
