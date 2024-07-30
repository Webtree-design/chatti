import { Component, ViewChild } from '@angular/core';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';
import { DropdownComponent } from '../flowbite/dropdown/dropdown.component';
import { ToggleListComponent } from '../flowbite/toggle-list/toggle-list.component';
import { SearchbarComponent } from '../flowbite/searchbar/searchbar.component';
import { AddComponent } from '../flowbite/add/add.component';
import { TableComponent } from '../flowbite/table/table.component';
import { PaginationComponent } from '../flowbite/pagination/pagination.component';
import { MobileDropdownComponent } from '../flowbite/mobile-dropdown/mobile-dropdown.component';

@Component({
  selector: 'app-beitraege',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownComponent,
    ToggleListComponent,
    SearchbarComponent,
    AddComponent,
    TableComponent,
    PaginationComponent,
    MobileDropdownComponent,
  ],
  templateUrl: './beitraege.component.html',
  styleUrls: ['./beitraege.component.scss'],
})
export class BeitraegeComponent {
  
  private pb: PocketBase;
  public selectedItem: string = 'Category';
  // public selectedPagination: string = 'All';
  public checkbox: boolean = false;
  public firstTableVisible: boolean = true;
  public secondTableVisible: boolean = false;
  public mobile: boolean = false;

  constructor(private pocketBaseService: PocketbaseService) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  async ngOnInit() {
    this.isMobile();
  }

  isMobile() {
    if (window.screen.width <= 767) {
      console.log('<768');
      this.mobile = true;
      this.checkbox = true;
      this.firstTableVisible = false;
      this.secondTableVisible = true;
    } else {
      this.mobile = false;
      this.checkbox = false;
      this.firstTableVisible = true;
      this.secondTableVisible = false;
    }
  }

  onItemSelected(item: string) {
    this.selectedItem = item;
    console.log(item);
  }

  // onPaginationSelected(item: string) {
  //   this.selectedPagination = item;
  //   console.log(item);
  // }

  handleCheckboxChange(value: any) {
    console.log(value);
    this.toggleTable();
  }

  toggleTable() {
    if (this.checkbox) {
      // Collapsing
      this.checkbox = !this.checkbox;
      this.firstTableVisible = !this.firstTableVisible;
      this.secondTableVisible = !this.secondTableVisible;
      setTimeout(() => {}, 250); // Match this duration with the CSS transition duration
    } else {
      // Expanding
      this.checkbox = !this.checkbox;
      this.secondTableVisible = !this.secondTableVisible;
      this.firstTableVisible = !this.firstTableVisible;
      setTimeout(() => {}, 250);
    }
  }
}
