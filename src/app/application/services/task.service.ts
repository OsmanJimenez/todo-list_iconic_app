import { Injectable, Inject } from '@angular/core';
import { Task } from '../../domain/models/task.model';
import { TaskRepository } from '../ports/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../ports/task-repository.token';
import { TaskStatus } from '../../domain/models/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Constructor for TaskService.
   *
   * @param {TaskRepository} taskRepository - The repository used to manage tasks.
   */
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN) private taskRepository: TaskRepository
  ) {}

  /**
   * Creates a new task and saves it to the repository.
   *
   * @param {string} title - The title of the task.
   * @param {string} [categoryId] - The category ID of the task (optional).
   * @param {TaskStatus} [status=TaskStatus.Pending] - The status of the task (defaults to Pending).
   * @param {string} [date] - The date of the task (optional).
   * @returns {Task} The newly created task.
   */
  addTask(
    title: string,
    categoryId?: string,
    status: TaskStatus = TaskStatus.Pending,
    date?: string
  ): Task {
    const newTask = new Task(
      this.generateId(),
      title,
      status,
      categoryId,
      new Date(),
      date
    );
    this.taskRepository.save(newTask);
    return newTask;
  }

  /**
   * Deletes a task from the repository.
   *
   * @param {string} taskId - The ID of the task to delete.
   * @returns {void}
   */
  deleteTask(taskId: string): void {
    this.taskRepository.delete(taskId);
  }

  /**
   * Toggles the completion status of a task.
   *
   * If the task is completed, it will be marked as pending. If it is pending, it will be marked as completed.
   *
   * @param {Task} task - The task whose status will be toggled.
   * @returns {void}
   */
  toggleTaskCompletion(task: Task): void {
    if (task.status === TaskStatus.Completed) {
      task.setStatus(TaskStatus.Pending);
    } else {
      task.setStatus(TaskStatus.Completed);
    }

    this.taskRepository.save(task);
  }

  /**
   * Updates an existing task with new data.
   *
   * @param {string} taskId - The ID of the task to update.
   * @param {Partial<Task>} updatedData - An object containing the fields to update.
   * @returns {Task | undefined} The updated task, or undefined if the task was not found.
   */
  updateTask(taskId: string, updatedData: Partial<Task>): Task | undefined {
    const task = this.taskRepository.findById(taskId);
    if (task) {
      Object.assign(task, updatedData);
      this.taskRepository.save(task);
      return task;
    }
    return undefined;
  }

  /**
   * Retrieves a paginated list of tasks from the repository.
   *
   * Tasks are sorted by their creation date, in descending order (most recent first).
   *
   * @param {number} page - The page number (starting from 0).
   * @param {number} pageSize - The number of tasks to retrieve per page.
   * @returns {Task[]} A list of tasks for the specified page.
   */
  getTasks(page: number, pageSize: number): Task[] {
    const tasks = this.taskRepository
      .findAll()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const start = page * pageSize;
    const end = start + pageSize;
    return tasks.slice(start, end);
  }

  /**
   * Generates a unique ID for a task.
   *
   * @private
   * @returns {string} A randomly generated string to use as a task ID.
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
