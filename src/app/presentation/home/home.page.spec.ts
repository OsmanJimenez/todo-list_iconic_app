import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { TaskService } from '../../application/services/task.service';
import { TasksComponent } from './components/tasks/tasks.component';
import { Task } from '../../domain/models/task.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskStatus } from '../../domain/models/task-status.enum';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let taskServiceMock: any;

  const mockTask: Task = {
    id: '1',
    title: 'Task 1',
    status: TaskStatus.Pending,
    categoryId: '123',
    createdAt: new Date(),
    setStatus: jest.fn(),
  };

  beforeEach(async () => {
    taskServiceMock = {
      getTasks: jest.fn().mockReturnValue([mockTask]),
      addTask: jest.fn(),
      toggleTaskCompletion: jest.fn(),
      deleteTask: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomePage, TasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    component.tasksComponent = {
      loadTasks: jest.fn(),
      tasks: [],
      filteredTasks: [],
      config: {},
      filterCategoryId: '',
      page: 0,
      pageSize: 20,
      totalTasks: 0,
      loadMoreTasks: jest.fn(),
      getFilteredTasks: jest.fn(),
      toggleCompletion: jest.fn(),
      deleteTask: jest.fn(),
    } as unknown as TasksComponent;

    fixture.detectChanges();
  });

  it(`Given HomePage instance,
      When created,
      Then should initialize with default values`, () => {
    // Assert
    expect(component.filterCategoryId).toBe('');
    expect(component.config).toBeDefined();
    expect(component.tasksComponent).toBeDefined();
  });

  it(`Given HomePage instance,
      When ngOnInit is called,
      Then should call loadTasks`, () => {
    // Arrange
    jest.spyOn(component, 'loadTasks');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it(`Given a new task,
      When addTask is called,
      Then should call taskService.addTask and reload tasks`, () => {
    // Arrange
    const taskData = { title: 'New Task', categoryId: '123' };
    jest.spyOn(component, 'loadTasks');

    // Act
    component.addTask(taskData);

    // Assert
    expect(taskServiceMock.addTask).toHaveBeenCalledWith(taskData.title, taskData.categoryId);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it(`Given a task,
      When toggleCompletion is called,
      Then should call taskService.toggleTaskCompletion and reload tasks`, () => {
    // Arrange
    jest.spyOn(component, 'loadTasks');

    // Act
    component.toggleCompletion(mockTask);

    // Assert
    expect(taskServiceMock.toggleTaskCompletion).toHaveBeenCalledWith(mockTask);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it(`Given a task id,
      When deleteTask is called,
      Then should call taskService.deleteTask and reload tasks`, () => {
    // Arrange
    const taskId = '1';
    jest.spyOn(component, 'loadTasks');

    // Act
    component.deleteTask(taskId);

    // Assert
    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.loadTasks).toHaveBeenCalled();
  });
});
