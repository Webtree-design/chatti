import { Component } from '@angular/core';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';
import { DropdownComponent } from '../flowbite/dropdown/dropdown.component';
import { ToggleListComponent } from '../flowbite/toggle-list/toggle-list.component';
import { SearchbarComponent } from '../flowbite/searchbar/searchbar.component';
import { TableComponent } from '../flowbite/table/table.component';

@Component({
  selector: 'app-beitraege',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownComponent,
    ToggleListComponent,
    SearchbarComponent,
    TableComponent,
  ],
  templateUrl: './beitraege.component.html',
  styleUrls: ['./beitraege.component.scss'],
})
export class BeitraegeComponent {
  private pb: PocketBase;
  data = {
    title: '',
    content: '',
    images: [],
  };
  public selectedItem: string = 'Choose category';
  public checkbox: boolean = false;
  public firstTableVisible: boolean = true;
  public secondTableVisible: boolean = false;
  error: string | null = null;

  constructor(private pocketBaseService: PocketbaseService) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  async ngOnInit() {
    const data = await this.pocketBaseService.getBeitraege();
    console.log({ beitraege: data });
  }

  async onSubmit() {
    const data = {
      title: this.data.title,
      content: this.data.content,
      images: this.data.images,
      user_id: this.pb.authStore.model?.['id'],
    };

    this.error = null;
    try {
      this.pocketBaseService.postBeitraege(data);
    } catch (error: any) {
      console.error('Error logging in', error);
      this.error =
        error?.response?.data?.message ||
        'pocketBaseService.createBeitraege(data)';
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.data.images = Array.from(event.target.files);
    }
  }

  onItemSelected(item: string) {
    this.selectedItem = item;
  }

  handleCheckboxChange(value: boolean) {
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
