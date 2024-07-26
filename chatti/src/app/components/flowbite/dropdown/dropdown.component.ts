import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { initFlowbite, Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();
  public selectedItem: string = 'Category';

  ngOnInit() {
    initFlowbite();
    this.initDropdown();
  }

  initDropdown() {
    const $targetEl = document.getElementById(
      'dropdownAction'
    ) as HTMLElement | null;
    const $triggerEl = document.getElementById(
      'dropdownActionButton'
    ) as HTMLElement | null;

    if ($targetEl && $triggerEl) {
      const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'none', // Set to 'none' to manually handle the toggle
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        ignoreClickOutsideClass: false,
      };

      // Instance options object
      const instanceOptions = {
        id: 'dropdownMenu',
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

      $targetEl.addEventListener('click', (event) => {
        dropdown.hide();
        const target = event.target as HTMLElement;
        this.itemSelected.emit(target.textContent?.trim() || '');
        this.selectedItem = target.textContent?.trim() || '';
      });
    }
  }
}
