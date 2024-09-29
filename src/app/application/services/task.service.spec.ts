import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { TaskRepository } from '../ports/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../ports/task-repository.token';
import { Task } from '../../domain/models/task.model';
import { TaskStatus } from '../../domain/models/task-status.enum';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

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

  beforeEach(() => {
    taskRepositoryMock = {
      save: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn().mockReturnValue(mockTasks),
    };

    TestBed.configureTestingModule({
      providers: [TaskService, { provide: TASK_REPOSITORY_TOKEN, useValue: taskRepositoryMock }],
    });

    taskService = TestBed.inject(TaskService);
  });

  it(`Given a new task with a specific date,
      When addTask is called,
      Then it should save the task with the specified date to the repository`, () => {
    // Arrange
    const title = 'New Task';
    const categoryId = '123';
    const specificDate = '2024-09-30T00:00:00Z';

    // Act
    const newTask = taskService.addTask(title, categoryId, TaskStatus.Pending, specificDate);

    // Assert
    expect(newTask.title).toBe(title);
    expect(newTask.categoryId).toBe(categoryId);
    expect(newTask.status).toBe(TaskStatus.Pending);
    expect(newTask.date).toBe(specificDate);
    expect(taskRepositoryMock.save).toHaveBeenCalledWith(newTask);
  });

  it(`Given a task id,
      When deleteTask is called,
      Then it should delete the task from the repository`, () => {
    // Arrange
    const taskId = '1';

    // Act
    taskService.deleteTask(taskId);

    // Assert
    expect(taskRepositoryMock.delete).toHaveBeenCalledWith(taskId);
  });

  it(`Given a completed task,
      When toggleTaskCompletion is called,
      Then it should change the status to Pending and save the task`, () => {
    // Arrange
    const task = mockTasks[1]; // Completed task

    // Act
    taskService.toggleTaskCompletion(task);

    // Assert
    expect(task.setStatus).toHaveBeenCalledWith(TaskStatus.Pending);
    expect(taskRepositoryMock.save).toHaveBeenCalledWith(task);
  });

  it(`Given a pending task,
      When toggleTaskCompletion is called,
      Then it should change the status to Completed and save the task`, () => {
    // Arrange
    const task = mockTasks[0]; // Pending task

    // Act
    taskService.toggleTaskCompletion(task);

    // Assert
    expect(task.setStatus).toHaveBeenCalledWith(TaskStatus.Completed);
    expect(taskRepositoryMock.save).toHaveBeenCalledWith(task);
  });

  it(`Given a page and pageSize,
    When getTasks is called,
    Then it should return the correct slice of tasks sorted by createdAt`, () => {
    // Arrange
    const page = 0;
    const pageSize = 1;

    // Act
    const result = taskService.getTasks(page, pageSize);

    // Assert
    expect(taskRepositoryMock.findAll).toHaveBeenCalled();
    expect(result.length).toBe(pageSize);
    expect(result[0].createdAt.getTime()).toBeGreaterThanOrEqual(result[1]?.createdAt.getTime() || 0);
  });

  it(`Given a second page and pageSize,
    When getTasks is called,
    Then it should return the correct slice for the second page`, () => {
    // Arrange
    const page = 1;
    const pageSize = 1;

    // Act
    const result = taskService.getTasks(page, pageSize);

    // Assert
    expect(taskRepositoryMock.findAll).toHaveBeenCalled();
    expect(result.length).toBe(pageSize);
    expect(result[0].id).toBe('1');
  });
});
