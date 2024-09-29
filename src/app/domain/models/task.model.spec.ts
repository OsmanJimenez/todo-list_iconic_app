import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';

describe('Task', () => {
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

  it(`Given a Task,
      When created with a specific date,
      Then it should assign the date correctly`, () => {
    // Arrange & Act
    const specificDate = '2024-09-30T00:00:00Z';
    const task = new Task('1', 'Test Task', TaskStatus.Pending, '123', new Date(), specificDate);

    // Assert
    expect(task.date).toBe(specificDate);
  });
});
