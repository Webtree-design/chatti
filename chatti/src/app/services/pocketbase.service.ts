import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private pb: PocketBase;

  constructor(private authService: AuthService) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  //#region Beitraege
  async postBeitraege(data: Object) {
    await this.pb.collection('beitraege').create(data);
  }

  async getBeitraege() {
    const res = await this.pb.collection('beitraege').getFullList({
      filter: `user_id = "${this.pb.authStore.model?.['id']}"`,
      sort: '-created',
    });
    return res;
  }
  async updateBeitraege() {
    const res = await this.pb.collection('beitraege').getFullList({
      filter: `user_id = "${this.pb.authStore.model?.['id']}"`,
      sort: '-created',
    });
    return res;
  }



  //#endregion Beitraege
}
