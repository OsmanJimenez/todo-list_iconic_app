import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../../../application/services/task.service';
import { Task } from '../../../../domain/models/task.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskStatus } from '../../../../domain/models/task-status.enum';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskServiceMock: any;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      status: TaskStatus.Pending,
      categoryId: '123',
      createdAt: new Date(),
      setStatus: jest.fn(),
    },
    {
      id: '2',
      title: 'Task 2',
      status: TaskStatus.Completed,
      categoryId: '456',
      createdAt: new Date(),
      setStatus: jest.fn(),
    },
  ];

  beforeEach(async () => {
    taskServiceMock = {
      getTasks: jest.fn().mockReturnValue(mockTasks),
      toggleTaskCompletion: jest.fn(),
      deleteTask: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given TasksComponent instance,
      When ngOnInit is called,
      Then should load tasks and filteredTasks correctly`, () => {
    // Arrange
    jest.spyOn(component, 'loadTasks');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.loadTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.filteredTasks.length).toBeLessThanOrEqual(component.pageSize);
  });

  it(`Given a task's status is toggled,
      When toggleCompletion is called,
      Then should call taskService.toggleTaskCompletion and reload tasks`, () => {
    // Arrange
    const task = mockTasks[0];
    jest.spyOn(component, 'loadTasks');

    // Act
    component.toggleCompletion(task);

    // Assert
    expect(taskServiceMock.toggleTaskCompletion).toHaveBeenCalledWith(task);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it(`Given task deletion is allowed,
      When deleteTask is called,
      Then should call taskService.deleteTask and reload tasks`, () => {
    // Arrange
    const taskId = '1';
    jest.spyOn(component, 'loadTasks');
    component.allowTaskDeletion = true;

    // Act
    component.deleteTask(taskId);

    // Assert
    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it(`Given task deletion is not allowed,
      When deleteTask is called,
      Then should not call taskService.deleteTask`, () => {
    // Arrange
    const taskId = '1';
    jest.spyOn(component, 'loadTasks');
    component.allowTaskDeletion = false;

    // Act
    component.deleteTask(taskId);

    // Assert
    expect(taskServiceMock.deleteTask).not.toHaveBeenCalled();
    expect(component.loadTasks).not.toHaveBeenCalled();
  });

  it(`Given category filter is applied,
      When applyFilter is called,
      Then should filter tasks by categoryId and limit by page size`, () => {
    // Arrange
    component.filterCategoryId = '123';
    component.page = 0;
    component.pageSize = 2;
    component.tasks = mockTasks;

    // Act
    component.applyFilter();

    // Assert
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks.every(task => task.categoryId === '123')).toBeTruthy();
  });

  it(`Given more tasks are available,
    When loadMoreTasks is called,
    Then it should append the next set of tasks to filteredTasks and call event.target.complete`, () => {
    // Arrange
    const mockEvent = { target: { complete: jest.fn(), disabled: false } };
    const nextTasks: Task[] = [
      {
        id: '3',
        title: 'Task 3',
        status: TaskStatus.Pending,
        categoryId: '123',
        createdAt: new Date(),
        setStatus: jest.fn(),
      },
    ];
    taskServiceMock.getTasks.mockReturnValue(nextTasks);
    component.filteredTasks = mockTasks;
    component.totalTasks = 3;

    // Act
    component.loadMoreTasks(mockEvent);

    // Assert
    expect(component.page).toBe(1);
    expect(taskServiceMock.getTasks).toHaveBeenCalledWith(1, component.pageSize);
    expect(component.filteredTasks.length).toBe(3);
    expect(mockEvent.target.complete).toHaveBeenCalled();
    expect(mockEvent.target.disabled).toBe(true);
  });

  it(`Given no more tasks are available,
    When loadMoreTasks is called,
    Then event.target.disabled should be set to true`, () => {
    // Arrange
    const mockEvent = { target: { complete: jest.fn(), disabled: false } };
    const nextTasks: Task[] = [];
    taskServiceMock.getTasks.mockReturnValue(nextTasks);
    component.filteredTasks = mockTasks;
    component.totalTasks = 2;

    // Act
    component.loadMoreTasks(mockEvent);

    // Assert
    expect(component.page).toBe(1);
    expect(taskServiceMock.getTasks).toHaveBeenCalledWith(1, component.pageSize);
    expect(component.filteredTasks.length).toBe(2);
    expect(mockEvent.target.complete).toHaveBeenCalled();
    expect(mockEvent.target.disabled).toBe(true);
  });

  it(`Given TasksComponent instance,
      When ngOnChanges is called,
      Then should apply the filter`, () => {
    // Arrange
    jest.spyOn(component, 'applyFilter');

    // Act
    component.ngOnChanges();

    // Assert
    expect(component.applyFilter).toHaveBeenCalled();
  });
});
