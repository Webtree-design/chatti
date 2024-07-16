import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PasswordResetComponent {
  user = {
    email: ''
  };

  pb = new PocketBase('https://pocket.webtree-design.de');
  message: string | null = null;
  error: string | null = null;

  async onSubmit() {
    this.message = null;
    this.error = null;
    try {
      await this.pb.collection('users').requestPasswordReset(this.user.email);
      this.message = 'Password reset email sent. Please check your inbox.';
    } catch (error: any) {
      console.error('Error requesting password reset', error);
      this.error = error?.response?.data?.message || 'Request failed. Please try again.';
    }
  }
}
