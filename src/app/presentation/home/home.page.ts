import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config';
import { TasksComponent } from './components/tasks/tasks.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(TasksComponent) tasksComponent!: TasksComponent;

  filterCategoryId: string = '';
  config = HOME_CONFIG;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksComponent.loadTasks(); // Actualiza el componente de tareas
  }

  addTask(taskData: { title: string; categoryId?: string }) {
    this.taskService.addTask(taskData.title, taskData.categoryId);
    this.loadTasks(); // Cargar las tareas actualizadas
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks(); // Actualiza la lista de tareas
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks(); // Actualiza la lista después de eliminar la tarea
  }
}
