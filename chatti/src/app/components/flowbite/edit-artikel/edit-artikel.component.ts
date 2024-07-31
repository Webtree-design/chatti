import { Component, OnInit, ViewChild } from '@angular/core';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import PocketBase from 'pocketbase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-artikel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-artikel.component.html',
  styleUrl: './edit-artikel.component.scss',
})
export class EditArtikelComponent implements OnInit {
  private pb: PocketBase;
  data = {
    id: '',
    title: '',
    content: '',
  };
  imageUrls: string[] = [];
  mainImageIndex: number | null = null; // To keep track of the main image index
  error: string | null = null;
  showTitleError = false;
  showImageError = false;
  public item: any;

  constructor(
    private pocketBaseService: PocketbaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
    const navigation = this.router.getCurrentNavigation();
    this.item = navigation?.extras.state as { item: any };
    if (this.item) {
      this.data = this.item;
      this.imageUrls = this.item.imagesUrl || [];
      this.mainImageIndex = this.imageUrls.indexOf(this.item.mainImageUrl);
    }
  }

  ngOnInit() {
    console.log(this.item);
    // Access the route parameter if needed
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Route ID:', id);
  }

  async onSubmit() {
    if (!this.data.title || this.imageUrls.length === 0) {
      this.showValidationError();
      return;
    }

    const mainImage =
      this.mainImageIndex !== null ? this.imageUrls[this.mainImageIndex] : null;
    const sideImages =
      this.mainImageIndex !== null
        ? this.imageUrls.filter((_, index) => index !== this.mainImageIndex)
        : this.imageUrls;

    const data = {
      title: this.data.title,
      content: this.data.content,
      imagesUrl: sideImages,
      mainImageUrl: mainImage, // Add main image to data
      user_id: this.pb.authStore.model?.['id'],
    };

    this.error = null;
    try {
      await this.pocketBaseService.updateBeitraege(this.data.id, data); // Assume there's an update method in the service
      this.clearForm();
      this.router.navigate(['/']); // Redirect to some other page after update
    } catch (error: any) {
      console.error('Error updating entry', error);
      this.error = error?.response?.data?.message || 'Error updating entry';
    }
  }

  public selectFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const newFiles = Array.from(input.files);

      for (let file of newFiles) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
            // Automatically set the main image if the total number of images is 1
            if (this.imageUrls.length === 1) {
              this.mainImageIndex = 0;
            }
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select a valid image file.');
        }
      }
    }
    console.log(this.imageUrls);
  }

  public removeImage(index: number): void {
    this.imageUrls.splice(index, 1);
    // Update mainImageIndex if necessary
    if (this.mainImageIndex !== null) {
      if (index === this.mainImageIndex) {
        this.mainImageIndex = null; // Reset main image if it was removed
        // Automatically set the new main image if there are any images left
        if (this.imageUrls.length > 0) {
          this.mainImageIndex = 0;
        }
      } else if (index < this.mainImageIndex) {
        this.mainImageIndex--; // Adjust main image index if necessary
      }
    }
    // Automatically set the main image if there is only one image left
    if (this.imageUrls.length === 1) {
      this.mainImageIndex = 0;
    }
  }

  clearForm() {
    this.data = {
      id: '',
      title: '',
      content: '',
    };
    this.imageUrls = [];
    this.mainImageIndex = null;
  }

  public chooseMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  private showValidationError() {
    if (!this.data.title) {
      this.showTitleError = true;
    }
    if (this.imageUrls.length === 0) {
      this.showImageError = true;
    }

    setTimeout(() => {
      this.showTitleError = false;
      this.showImageError = false;
    }, 3000);
  }
}
