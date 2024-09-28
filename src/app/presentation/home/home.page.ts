import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config';
import { Observable } from 'rxjs';
import { RemoteConfigService } from '../../infrastructure/services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskCategoryId: string = '';
  filterCategoryId: string = '';

  config = HOME_CONFIG;

  allowTaskCompletion$: Observable<boolean> | undefined;
  allowTaskDeletion$: Observable<boolean> | undefined;
  showAddTaskButton$: Observable<boolean> | undefined;
  enableCategoryFilter$: Observable<boolean> | undefined;

  constructor(
    private taskService: TaskService,
    private remoteConfigService: RemoteConfigService
  ) {
    this.loadTasks();
  }

  ngOnInit() {
    this.remoteConfigService.activateRemoteConfig().subscribe(
      () => {
        console.log('Remote Config activado y listo.');

        this.allowTaskCompletion$ = this.remoteConfigService.getBooleanValue$('allowTaskCompletion');
        this.allowTaskDeletion$ = this.remoteConfigService.getBooleanValue$('allowTaskDeletion');
        this.showAddTaskButton$ = this.remoteConfigService.getBooleanValue$('showAddTaskButton');
        this.enableCategoryFilter$ = this.remoteConfigService.getBooleanValue$('enableCategoryFilter');
      },
      err => {
        console.error('Error al activar Remote Config:', err);
      }
    );
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
