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

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public bodyHeight: number = 0;
  items = [
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
    { item: 'item' },
  ];

  @ViewChild('wrapper') wrapper!: ElementRef;

  @Input() selectedItem: string = 'Category';
  @Input() checkbox: boolean = false;
  @Input() firstTableVisible: boolean = true;
  @Input() secondTableVisible: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

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
}
