import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationComponent } from '../pagination/pagination.component';
import PocketBase from 'pocketbase';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowImageComponent } from '../../show-image/show-image.component';
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
  public bodyHeight: number = 0;
  items: any;

  @ViewChild('wrapper') wrapper!: ElementRef;

  @Input() selectedItem: string = 'Category';
  @Input() checkbox: boolean = false;
  @Input() firstTableVisible: boolean = true;
  @Input() secondTableVisible: boolean = false;

  @Input() image: string | null = null;

  private pb: PocketBase;

  constructor(
    private cdRef: ChangeDetectorRef,
    private pocketBaseService: PocketbaseService,
    public dialog: MatDialog
  ) {
    this.pb = new PocketBase('https://pocket.webtree-design.de');
  }

  ngOnInit() {
    this.getBeitraege();
  }

  private async getBeitraege() {
    const data = await this.pocketBaseService.getBeitraege();
    this.items = data;
    console.log({ beitraege: this.items });
  }

  ngAfterViewInit() {
    const body = this.wrapper.nativeElement.offsetHeight;
    this.bodyHeight = body;
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checkbox']) {
      this.cdRef.detectChanges();
    }
  }

  openImageDialog(image: string): void {
    this.dialog.open(ShowImageComponent, {
      data: { image },
      width: 'fit-content',
      maxHeight: '80vh',
    });
  }
}
