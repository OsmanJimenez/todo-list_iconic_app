import { Component, EventEmitter, Output } from '@angular/core';
import { CATEGORY_FILTER_CONFIG } from './category-filter.config';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  filterQuery: string = '';

  config = CATEGORY_FILTER_CONFIG;

  @Output() filterCategory = new EventEmitter<string>();

  onFilterChange() {
    this.filterCategory.emit(this.filterQuery.trim().toLowerCase());
  }

  clearFilter() {
    this.filterQuery = '';
    this.onFilterChange();
  }
}
