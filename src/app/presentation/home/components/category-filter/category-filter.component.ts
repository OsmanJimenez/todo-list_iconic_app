import { Component, EventEmitter, Output } from '@angular/core';
import { CATEGORY_FILTER_CONFIG } from './category-filter.config';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public filterQuery: string = '';
  public config = CATEGORY_FILTER_CONFIG;

  @Output() public filterCategory = new EventEmitter<string>();

  public onFilterChange() {
    this.filterCategory.emit(this.filterQuery.trim().toLowerCase());
  }

  public clearFilter() {
    this.filterQuery = '';
    this.onFilterChange();
  }
}
