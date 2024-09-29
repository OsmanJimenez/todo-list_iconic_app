import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';

describe('Task', () => {
  it(`Given a new Task,
      When created,
      Then it should have the correct default values`, () => {
    // Arrange & Act
    const task = new Task('1', 'Test Task');

    // Assert
    expect(task.id).toBe('1');
    expect(task.title).toBe('Test Task');
    expect(task.status).toBe(TaskStatus.Pending);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.categoryId).toBeUndefined();
  });

  it(`Given a Task,
      When created with a specific status,
      Then it should set the status correctly`, () => {
    // Arrange & Act
    const task = new Task('1', 'Test Task', TaskStatus.Completed);

    // Assert
    expect(task.status).toBe(TaskStatus.Completed);
  });

  it(`Given a Task,
      When setStatus is called,
      Then it should update the status`, () => {
    // Arrange
    const task = new Task('1', 'Test Task');

    // Act
    task.setStatus(TaskStatus.InProgress);

    // Assert
    expect(task.status).toBe(TaskStatus.InProgress);
  });

  it(`Given a Task,
      When created with categoryId,
      Then it should assign the categoryId correctly`, () => {
    // Arrange & Act
    const task = new Task('1', 'Test Task', TaskStatus.Pending, '123');

    // Assert
    expect(task.categoryId).toBe('123');
  });
});
