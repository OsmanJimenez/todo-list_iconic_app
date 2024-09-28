import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config';
import { fetchAndActivate, RemoteConfig } from '@angular/fire/remote-config';
import { getStringChanges } from '@angular/fire/remote-config';
import { from, map, Observable } from 'rxjs';

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
    private remoteConfig: RemoteConfig
  ) {
    this.loadTasks();
  }

  ngOnInit() {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 0;

    from(fetchAndActivate(this.remoteConfig)).subscribe(
      () => {
        console.log('Remote Config activado y listo.');

        this.allowTaskCompletion$ = getStringChanges(
          this.remoteConfig,
          'allowTaskCompletion'
        ).pipe(map(value => value === 'true'));

        this.allowTaskDeletion$ = getStringChanges(
          this.remoteConfig,
          'allowTaskDeletion'
        ).pipe(map(value => value === 'true'));

        this.showAddTaskButton$ = getStringChanges(
          this.remoteConfig,
          'showAddTaskButton'
        ).pipe(map(value => value === 'true'));

        this.enableCategoryFilter$ = getStringChanges(
          this.remoteConfig,
          'enableCategoryFilter'
        ).pipe(map(value => value === 'true'));
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
