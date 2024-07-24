import { Component } from '@angular/core';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PocketBase from 'pocketbase';
@Component({
  selector: 'app-beitraege',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beitraege.component.html',
  styleUrl: './beitraege.component.scss',
})
export class BeitraegeComponent {
  private pb: PocketBase;
  data = {
    title: '',
    content: '',
    images: [],
  };
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
}
