import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given AddTaskComponent instance,
      When created,
      Then should initialize with default values`, () => {
    // Assert
    expect(component.newTaskTitle).toBe('');
    expect(component.newTaskCategoryId).toBe('');
    expect(component.newTaskDate).toBeNull();
  });

  it(`Given new task title, category, and date,
      When onAddTask is called,
      Then should emit addTask event with task details including date`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.newTaskTitle = 'New Task';
    component.newTaskCategoryId = '123';
    component.newTaskDate = '2024-09-29';

    // Act
    component.onAddTask();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({
      title: 'New Task',
      categoryId: '123',
      date: '2024-09-29',
    });
    expect(component.newTaskTitle).toBe('');
    expect(component.newTaskCategoryId).toBe('');
    expect(component.newTaskDate).toBeNull();
  });

  it(`Given new task title without category or date,
      When onAddTask is called,
      Then should emit addTask event with only task title`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.newTaskTitle = 'New Task';
    component.newTaskCategoryId = '';
    component.newTaskDate = null;

    // Act
    component.onAddTask();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({
      title: 'New Task',
      categoryId: '',
      date: undefined,
    });
    expect(component.newTaskTitle).toBe('');
    expect(component.newTaskCategoryId).toBe('');
    expect(component.newTaskDate).toBeNull();
  });

  it(`Given empty task title,
      When onAddTask is called,
      Then should not emit addTask event`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.newTaskTitle = '';

    // Act
    component.onAddTask();

    // Assert
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it(`Given a date is selected,
      When clearDate is called,
      Then the date should be reset to null`, () => {
    // Arrange
    component.newTaskDate = '2024-09-29';

    // Act
    component.clearDate();

    // Assert
    expect(component.newTaskDate).toBeNull();
  });
});
