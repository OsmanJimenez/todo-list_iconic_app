import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter.component';
import { CATEGORY_FILTER_CONFIG } from './category-filter.config';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given CategoryFilterComponent instance,
      When created,
      Then should initialize with default values`, () => {
    // Assert
    expect(component.filterCategoryId).toBe('');
    expect(component.config).toEqual(CATEGORY_FILTER_CONFIG);
  });

  it(`Given a filterCategoryId is set,
      When onFilterChange is called,
      Then should emit filterCategory event with the filterCategoryId`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.filterCategory, 'emit');
    component.filterCategoryId = '123';

    // Act
    component.onFilterChange();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('123');
  });

  it(`Given filterCategoryId is an empty string,
      When onFilterChange is called,
      Then should emit filterCategory event with an empty string`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.filterCategory, 'emit');
    component.filterCategoryId = '';

    // Act
    component.onFilterChange();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('');
  });
});
