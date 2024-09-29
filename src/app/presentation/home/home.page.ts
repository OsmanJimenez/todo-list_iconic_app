import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config';
import { TasksComponent } from './components/tasks/tasks.component';
import { Observable } from 'rxjs';
import { RemoteConfigService } from '../../infrastructure/services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(TasksComponent) tasksComponent!: TasksComponent;
  allowTaskCompletion$: Observable<boolean> | undefined;
  allowTaskDeletion$: Observable<boolean> | undefined;
  showAddTaskButton$: Observable<boolean> | undefined;
  enableCategoryFilter$: Observable<boolean> | undefined;
  filterCategoryId: string = '';
  isModalOpen = false;
  config = HOME_CONFIG;

  constructor(
    private taskService: TaskService,
    private remoteConfigService: RemoteConfigService
  ) {}

  ngOnInit() {
    this.remoteConfigService.activateRemoteConfig().subscribe(() => {
      this.allowTaskCompletion$ = this.remoteConfigService.getBooleanValue$('allowTaskCompletion');
      this.allowTaskDeletion$ = this.remoteConfigService.getBooleanValue$('allowTaskDeletion');
      this.showAddTaskButton$ = this.remoteConfigService.getBooleanValue$('showAddTaskButton');
      this.enableCategoryFilter$ = this.remoteConfigService.getBooleanValue$('enableCategoryFilter');
    });
    this.loadTasks();
  }

  loadTasks() {
    this.tasksComponent.loadTasks();
  }

  addTask(taskData: { title: string; categoryId?: string; date?: string}) {
    this.taskService.addTask(
      taskData.title,
      taskData.categoryId,
      undefined,
      taskData.date
    );
    this.loadTasks();
    this.setOpen(false); // Cierra el modal después de agregar la tarea
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
