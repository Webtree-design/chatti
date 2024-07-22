import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  isLoggedIn(): boolean {
    return this.pb.authStore.isValid;
  }

  getAuthToken(): string | null {
    return this.pb.authStore.token;
  }

  logout(): void {
    this.pb.authStore.clear();
  }
}
