import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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

  tasks: Task[] = [];
  filterCategoryId: string = '';

  config = HOME_CONFIG;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.cdr.detectChanges();
  }

  addTask(taskData: { title: string; categoryId?: string }) {
    this.taskService.addTask(taskData.title, taskData.categoryId);
    this.tasksComponent.loadTasks();
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
}
