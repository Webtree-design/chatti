import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSidenavModule,
  MatDrawer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';

import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: '<app-root></app-root>',
  standalone: true,
  imports: [
    LoginComponent,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
    CommonModule,
    MatDrawer,
    MatDrawerContent,
    MatToolbarModule,
  ],
})
export class AppComponent {
  @ViewChild(MatDrawer) sidenav!: MatDrawer;
  @ViewChild(MatDrawerContent) content!: MatDrawerContent;

  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);

  protected isMobileSidenav: boolean = false;
  protected isHalfSidenav: boolean = false;

  public isLogged: boolean = true;

  constructor(private authService: AuthService) {
    this.isLoggedin();
  }

  async ngOnInit() {
    await this.isLoggedin();
    this.sideNav();
  }

  async onRouterLinkActivate() {
    await this.isLoggedin();
  }

  async isLoggedin() {
    this.isLogged = await this.authService.isLoggedIn();
    console.log({ isLogged: this.isLogged });
  }

  sideNav() {
    Promise.resolve().then(() => {
      this.breakpointObserver
        .observe(['(max-width: 800px)'])
        .subscribe((res) => {
          if (this.sidenav) {
            if (res.matches) {
              this.sidenav.mode = 'over';
              this.isMobileSidenav = true;
              this.sidenav.close();
            } else {
              this.sidenav.mode = 'side';
              this.isMobileSidenav = false;
              this.isHalfSidenav = false;
              this.sidenav.open();
            }
          }
        });
    });
  }

  toggleSidenav(): void {
    if (this.isMobileSidenav) {
      this.sidenav.toggle();
    } else {
      this.isHalfSidenav = !this.isHalfSidenav;
      this.content.getElementRef().nativeElement.style.marginLeft = this
        .isHalfSidenav
        ? '85px'
        : '220px';
    }
  }
}
