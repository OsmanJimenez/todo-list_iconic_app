import { Component } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config'; // Importar configuración

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskCategoryId: string = '';
  filterCategoryId: string = '';

  config = HOME_CONFIG; // Usar la configuración

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const categoryId = this.newTaskCategoryId || undefined;
      this.taskService.addTask(this.newTaskTitle, categoryId);
      this.newTaskTitle = '';
      this.newTaskCategoryId = '';
      this.loadTasks();
    }
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  getFilteredTasks(): Task[] {
    if (this.filterCategoryId.trim() === '') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.categoryId === this.filterCategoryId);
  }
}
