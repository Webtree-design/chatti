import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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


  async onSubmit() {
    try {
      const data = {
        username: this.user.username,
        email: this.user.email,
        emailVisibility: true,
        password:this.user.password,
        passwordConfirm: this.user.passwordConfirm,
        name: this.user.username,
      };

      const record = await this.pb.collection('users').create(data);
      console.log('User registered successfully', record);

      // Optional: Send email verification request
      await this.pb.collection('users').requestVerification(this.user.email);
      console.log('Verification email sent');
    } catch (error: any) {
      console.error('Error registering user', error);
      this.error = error?.response?.data?.message || 'Registration failed. Please try again.';
    }
  }
}