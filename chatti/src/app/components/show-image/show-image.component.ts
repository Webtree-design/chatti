import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-show-image',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './show-image.component.html',
  styleUrl: './show-image.component.scss',
})
export class ShowImageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string }) {}
}
