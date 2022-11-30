import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'lib-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss'],
})
export class FilterCardComponent {
  @Input()
  categoryList: string[] = [];
  @Input()
  filteredList: Object = {};
  @Input()
  fullList: Object = {};
  @Input()
  panelTitle!: string;

  @Output()
  category = new EventEmitter<string>();

  @Output()
  matExpansionPanelClosedEvent = new EventEmitter<boolean>();

  constructor() {}

  getCategoryForFilter(category: string): void {
    if (category) {
      this.category.emit(category);
    }
  }

  onExpansionPanelClosed(): void {
    this.matExpansionPanelClosedEvent.emit(true);
  }
}
