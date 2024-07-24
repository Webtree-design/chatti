import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pb: PocketBase;

  public isLogged: boolean = false;
  public isRegistering: boolean = false;

  constructor(private router: Router) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  isLoggedIn(): boolean {
    this.isLogged = this.pb.authStore.isValid;
    return this.pb.authStore.isValid;
  }

  // getAuthToken(): string | null {
  //   return this.pb.authStore.token;
  // }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  logout(): void {
    this.pb.authStore.clear();
    this.router.navigate(['/login']);
  }

  async getUserRecord(token: string) {}
}
