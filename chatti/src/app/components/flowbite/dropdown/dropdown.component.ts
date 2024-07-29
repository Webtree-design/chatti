import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { initFlowbite, Dropdown } from 'flowbite';
import type { DropdownOptions } from 'flowbite';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();
  public selectedItem: string = 'Category';
  public mobile: boolean = false;

  ngOnInit() {
    initFlowbite();
    this.isMobile();
    this.initDropdown();
  }

  isMobile() {
    if (window.screen.width <= 767) {
      console.log('<768');
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  initDropdown() {
    const $targetEl = document.getElementById(
      'dropdownActionCategory'
    ) as HTMLElement | null;
    const $triggerEl = document.getElementById(
      'dropdownActionButtonCategory'
    ) as HTMLElement | null;

    if ($targetEl && $triggerEl) {
      let placement: any = 'bottom';
      if (this.mobile) {
        placement = 'bottom';
      } else {
        placement = 'right';
      }
      console.log(placement)

      const options: DropdownOptions = {
        placement: placement,
        triggerType: 'none', // Set to 'none' to manually handle the toggle
        offsetSkidding: 0,
        offsetDistance: 0,
        delay: 300,
        ignoreClickOutsideClass: false,
      };

      // Instance options object
      const instanceOptions = {
        id: 'dropdownMenuCategory',
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
        console.log(event);
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
