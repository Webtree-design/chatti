import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { initFlowbite, Dropdown } from 'flowbite';
import type { DropdownOptions } from 'flowbite';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() itemsPerPageSelected = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  public selectedPagination: string = 'All';
  private currentPage: number = 1;

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
        triggerType: 'none',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        ignoreClickOutsideClass: false,
      };

      const dropdown = new Dropdown($targetEl, $triggerEl, options);

      $triggerEl.addEventListener('click', (event) => {
        if (dropdown.isVisible()) {
          return dropdown.hide();
        }
        dropdown.show();
      });

      $targetEl.addEventListener('click', (event) => {
        dropdown.hide();
        const target = event.target as HTMLElement;
        this.selectedPagination = target.textContent?.trim() || '';
        const value = target.textContent?.trim();
        if (value === 'All') {
          this.itemsPerPageSelected.emit(100000);
        } else {
          const itemsPerPage = Number(value);
          if (!isNaN(itemsPerPage)) {
            this.itemsPerPageSelected.emit(itemsPerPage);
          }
        }
      });
    }
  }

  selectValue(value: number) {
    console.log(value);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    this.currentPage++;
    this.pageChange.emit(this.currentPage);
  }
}
