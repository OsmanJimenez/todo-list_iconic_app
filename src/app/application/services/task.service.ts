import { Injectable, Inject } from '@angular/core';
import { Task } from '../../domain/models/task.model';
import { TaskRepository } from '../ports/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../ports/task-repository.token';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(@Inject(TASK_REPOSITORY_TOKEN) private taskRepository: TaskRepository) {}

  addTask(title: string, categoryId?: string): Task {
    const newTask = new Task(this.generateId(), title, false, categoryId, new Date());
    this.taskRepository.save(newTask);
    return newTask;
  }

  deleteTask(taskId: string): void {
    this.taskRepository.delete(taskId);
  }

  toggleTaskCompletion(task: Task): void {
    task.toggleCompletion();
    this.taskRepository.save(task);
  }

  getTasks(page: number, pageSize: number): Task[] {
    const tasks = this.taskRepository.findAll().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const start = page * pageSize;
    const end = start + pageSize;
    return tasks.slice(start, end);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
