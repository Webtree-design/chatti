import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationComponent } from '../pagination/pagination.component';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowImageComponent } from '../../show-image/show-image.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    PaginationComponent,
    ShowImageComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public bodyHeight?: number = 0;
  items: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  @Input() selectedItem: string = 'Category';
  @Input() checkbox: boolean = false;
  @Input() firstTableVisible: boolean = true;
  @Input() secondTableVisible: boolean = false;

  @Input() image: string | null = null;

  private beitraegeSubscription: Subscription = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private pocketBaseService: PocketbaseService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.beitraegeSubscription = this.pocketBaseService.beitraege$.subscribe(
      (data) => {
        this.items = data;
        console.log({ beitraege: this.items });
        this.cdRef.detectChanges();
      }
    );
    this.fetchBeitraege();
  }

  ngAfterViewInit() {
    const body = document.getElementById('mat-drawer-content')?.offsetHeight;
    console.log(body);
    this.bodyHeight = body;
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checkbox']) {
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.beitraegeSubscription.unsubscribe();
  }

  fetchBeitraege() {
    this.pocketBaseService.getBeitraege(this.currentPage, this.itemsPerPage);
  }

  onItemsPerPageSelected(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page whenever items per page changes
    this.fetchBeitraege();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchBeitraege();
  }

  openImageDialog(image: string): void {
    this.dialog.open(ShowImageComponent, {
      data: { image },
      width: 'fit-content',
      maxHeight: '80vh',
    });
  }

  navigateToEditPage(item: any) {
    console.log(item);
    this.router.navigate(['/edit-artikel', item.id], { state: item });
  }

  async deleteBeitrag(id: any) {
    try {
      await this.pocketBaseService.deleteBeitrag(id);
      // Filter out the deleted item from the items array
      this.items = this.items.filter((item) => item.id !== id);
      this.cdRef.detectChanges();
    } catch (error) {
      console.error('Error deleting entry', error);
      // Optionally, display an error message to the user
    }
  }
}
