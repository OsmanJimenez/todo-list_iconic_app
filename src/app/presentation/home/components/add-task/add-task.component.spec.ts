import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { ADD_TASK_CONFIG } from './add-task.config';
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
    expect(component.config).toEqual(ADD_TASK_CONFIG);
  });

  it(`Given new task title and category,
      When onAddTask is called,
      Then should emit addTask event with task details`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.newTaskTitle = 'New Task';
    component.newTaskCategoryId = '123';

    // Act
    component.onAddTask();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({
      title: 'New Task',
      categoryId: '123',
    });
    expect(component.newTaskTitle).toBe('');
    expect(component.newTaskCategoryId).toBe('');
  });

  it(`Given new task title without category,
      When onAddTask is called,
      Then should emit addTask event with only task title`, () => {
    // Arrange
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.newTaskTitle = 'New Task';
    component.newTaskCategoryId = '';

    // Act
    component.onAddTask();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({
      title: 'New Task',
      categoryId: undefined,
    });
    expect(component.newTaskTitle).toBe('');
    expect(component.newTaskCategoryId).toBe('');
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
});
