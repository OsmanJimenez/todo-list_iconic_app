import { Injectable } from '@angular/core';
import { Task } from '../../domain/models/task.model';
import { TaskRepository } from '../../application/ports/task.repository';
import { EncryptedStorageService } from '../services/encrypted-storage/encrypted-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTaskRepository implements TaskRepository {
  private readonly STORAGE_KEY = 'tasks';

  /**
   * Constructor for LocalStorageTaskRepository.
   *
   * @param {EncryptedStorageService} storageService - The encrypted storage service for saving and retrieving tasks.
   */
  constructor(private storageService: EncryptedStorageService) {}

  /**
   * Saves a task to the encrypted storage.
   *
   * If the task already exists, it will be updated. If it doesn't exist, it will be added.
   *
   * @param {Task} task - The task to save or update.
   * @returns {void}
   */
  save(task: Task): void {
    const tasks = this.findAll();
    const index = tasks.findIndex(t => t.id === task.id);

    if (index === -1) {
      tasks.push(task);
    } else {
      tasks[index] = task;
    }

    this.storageService.save(this.STORAGE_KEY, tasks);
  }

  /**
   * Deletes a task from the encrypted storage.
   *
   * @param {string} taskId - The ID of the task to delete.
   * @returns {void}
   */
  delete(taskId: string): void {
    const tasks = this.findAll().filter(t => t.id !== taskId);
    this.storageService.save(this.STORAGE_KEY, tasks);
  }

  /**
   * Retrieves all tasks from the encrypted storage.
   *
   * The tasks are mapped back into instances of the `Task` model.
   *
   * @returns {Task[]} An array of tasks stored in the local storage.
   */
  findAll(): Task[] {
    const tasks = this.storageService.get<Task[]>(this.STORAGE_KEY);
    return tasks
      ? tasks.map(
          (taskData: any) =>
            new Task(
              taskData.id,
              taskData.title,
              taskData.status,
              taskData.categoryId,
              new Date(taskData.createdAt),
              taskData.date
            )
        )
      : [];
  }

  /**
   * Finds a task by its ID.
   *
   * @param {string} taskId - The ID of the task to retrieve.
   * @returns {Task | undefined} The task with the specified ID, or undefined if not found.
   */
  findById(taskId: string): Task | undefined {
    return this.findAll().find(task => task.id === taskId);
  }
}
