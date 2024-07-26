import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule],
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
}
