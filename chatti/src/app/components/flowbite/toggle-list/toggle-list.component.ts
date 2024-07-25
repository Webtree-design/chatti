import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './toggle-list.component.html',
  styleUrls: ['./toggle-list.component.scss'],
})
export class ToggleListComponent {
  checkbox: boolean = false;

  @Output() checkboxChange = new EventEmitter<boolean>();

  getCheckboxValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkbox = input.checked;
    this.checkboxChange.emit(this.checkbox);
  }
}
