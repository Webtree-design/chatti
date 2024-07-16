import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  user = {
    identity: '',
    password: ''
  };

  pb = new PocketBase('https://pocket.webtree-design.de');
  error: string | null = null;

  async onSubmit() {
    this.error = null;
    try {
      const authData = await this.pb.collection('users').authWithPassword(this.user.identity, this.user.password);
      console.log('User logged in successfully', authData);
    } catch (error: any) {
      console.error('Error logging in', error);
      this.error = error?.response?.data?.message || 'Login failed. Please check your credentials and try again.';
    }
  }
}
