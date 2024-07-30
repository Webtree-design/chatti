import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  constructor(private router: Router) {}

  navigateToAddArtikel() {
    this.router.navigate(['/add-artikel']);
  }
}
