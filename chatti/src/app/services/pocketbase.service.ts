import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private pb: PocketBase;
  private beitraegeSubject = new BehaviorSubject<any[]>([]);
  beitraege$ = this.beitraegeSubject.asObservable();
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor(private authService: AuthService) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  //#region Beitraege
  async postBeitraege(data: Object) {
    await this.pb.collection('beitraege').create(data);
  }

  async getBeitraege(page: number = 1, perPage: number = 20) {
    try {
      const res = await this.pb.collection('beitraege').getList(page, perPage, {
        filter: `user_id = "${this.pb.authStore.model?.['id']}"`,
        sort: '-created',
      });
      this.beitraegeSubject.next(res.items);
      this.totalItemsSubject.next(res.totalItems); // Set the total number of items
      this.errorSubject.next(null); // Clear any previous errors
    } catch (error: any) {
      this.errorSubject.next(error.message);
    }
  }

  async updateBeitraege(id: string, data: any) {
    await this.pb.collection('beitraege').update(id, data);
  }

  async deleteBeitrag(id: string) {
    await this.pb.collection('beitraege').delete(id);
  }
  //#endregion Beitraege
}
