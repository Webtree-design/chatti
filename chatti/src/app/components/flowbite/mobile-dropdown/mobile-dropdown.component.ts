import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { initFlowbite, Dropdown } from 'flowbite';
import type { DropdownOptions } from 'flowbite';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ToggleListComponent } from '../toggle-list/toggle-list.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-mobile-dropdown',
  standalone: true,
  imports: [
    DropdownComponent,
    ToggleListComponent,
    SearchbarComponent,
    AddComponent,
  ],
  templateUrl: './mobile-dropdown.component.html',
  styleUrl: './mobile-dropdown.component.scss',
})
export class MobileDropdownComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>(); //DER MUSS RAUS UND DURCH DEN EXPANDER GESTAUSCHT WERDEN
  @Output() checkboxChange = new EventEmitter<boolean>();

  public selectedItem: string = 'Category';

  public selectedItemExpander: string = 'Category';

  // public selectedPagination: string = 'All';
  public checkbox: boolean = false;
  public firstTableVisible: boolean = true;
  public secondTableVisible: boolean = false;
  public mobile: boolean = false;

  error: string | null = null;
  ngOnInit() {
    initFlowbite();
    this.initDropdown();
  }

  getCheckboxValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkbox = input.checked;
    this.checkboxChange.emit(this.checkbox);
  }

  chooseCategoryExpander(value: string) {
    this.selectedItemExpander = value;
  }
  initDropdown() {
    const $targetEl = document.getElementById(
      'dropdownActionMobile'
    ) as HTMLElement | null;
    const $triggerEl = document.getElementById(
      'dropdownActionButtonMobile'
    ) as HTMLElement | null;

    if ($targetEl && $triggerEl) {
      const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'none', // Set to 'none' to manually handle the toggle
        offsetSkidding: 0,
        offsetDistance: 0,
        delay: 300,
        ignoreClickOutsideClass: false,
      };

      // Instance options object
      const instanceOptions = {
        id: 'dropdownMenuMobile',
        override: true,
      };

      // Create a new Dropdown object
      const dropdown = new Dropdown(
        $targetEl,
        $triggerEl,
        options,
        instanceOptions
      );

      // Add click event listener to the trigger element
      $triggerEl.addEventListener('click', (event) => {
        if (dropdown.isVisible()) {
          return dropdown.hide();
        }
        dropdown.show();
      });

      const items = $targetEl.querySelectorAll('.expander-item');
      items.forEach((item) => {
        item.addEventListener('click', (event) =>
          this.handleItemClick(event, dropdown)
        );
      });
    }
  }

  handleItemClick(event: Event, dropdown: Dropdown) {
    const target = event.target as HTMLElement;
    const selectedItem = target.textContent?.trim() || '';

    // Emit the selected item and update the displayed text
    this.itemSelected.emit(selectedItem);
    this.selectedItem = selectedItem;

    // Log the click event
    console.log(`Item clicked: ${selectedItem}`);

    // Hide the dropdown menu
    dropdown.hide();
  }

  onItemSelected(item: string) {
    this.selectedItem = item;
    console.log(item);
  }

  // onPaginationSelected(item: string) {
  //   this.selectedPagination = item;
  //   console.log(item);
  // }

  handleCheckboxChange(value: boolean) {
    this.checkboxChange.emit(value);
    console.log(value);
  }
}
