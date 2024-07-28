import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { initFlowbite, Dropdown } from 'flowbite';
import type { DropdownOptions } from 'flowbite';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Output() paginationSelected = new EventEmitter<string>();
  public selectedPagination: string = 'All';

  ngOnInit() {
    initFlowbite();
    this.initDropdown();
  }

  initDropdown() {
    const $targetEl = document.getElementById(
      'dropdownActionPagination'
    ) as HTMLElement | null;
    const $triggerEl = document.getElementById(
      'dropdownActionButtonPagination'
    ) as HTMLElement | null;

    if ($targetEl && $triggerEl) {
      const options: DropdownOptions = {
        placement: 'top',
        triggerType: 'none', // Set to 'none' to manually handle the toggle
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        ignoreClickOutsideClass: false,
      };

      // Instance options object
      const instanceOptions = {
        id: 'dropdownMenuPaginator',
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
          this.paginationSelected.emit(target.textContent?.trim() || '');
          this.selectedPagination = target.textContent?.trim() || '';
        });
    }
  }

  selectValue(value: number) {
    console.log(value);
  }
}
