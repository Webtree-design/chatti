import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    emailVisibility: true,
    password: '',
    passwordConfirm: '',
    name: '',
  };

  pb = new PocketBase('https://pocket.webtree-design.de');
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isRegistering = true;
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
    try {
      const data = {
        username: this.user.username,
        email: this.user.email,
        emailVisibility: true,
        password: this.user.password,
        passwordConfirm: this.user.passwordConfirm,
        name: this.user.username,
      };

      const record = await this.pb.collection('users').create(data);
      console.log('User registered successfully', record);

      // Optional: Send email verification request
      await this.pb.collection('users').requestVerification(this.user.email);
      console.log('Verification email sent');

      this.router.navigate(['/home']); // Redirect to protected route
    } catch (error: any) {
      console.error('Error registering user', error);
      this.error =
        error?.response?.data?.message ||
        'Registration failed. Please try again.';
    }
  }

  async registerWithOAuth2(provider: string) {
    try {
      const authData = await this.pb
        .collection('users')
        .authWithOAuth2({ provider });
      console.log('User registered successfully via OAuth2', authData);
      await this.pb
        .collection('users')
        .requestVerification(authData.meta?.['email']);
      console.log(authData.meta?.['email']);
      this.router.navigate(['/home']); // Redirect to protected route
    } catch (error: any) {
      console.error('OAuth2 registration failed', error);
      if (error?.response) {
        console.error('Response error:', error.response);
      }
      this.error =
        error?.response?.data?.message ||
        'OAuth2 Registration failed. Please try again.';
    }
  }
  public toggleRegister() {
    this.authService.toggleRegister();
  }
}
