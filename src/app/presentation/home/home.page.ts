import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../application/services/task.service';
import { Task } from '../../domain/models/task.model';
import { HOME_CONFIG } from './home.config';
import { TasksComponent } from './components/tasks/tasks.component';
import { Observable } from 'rxjs';
import { RemoteConfigService } from '../../infrastructure/services/remote-config/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(TasksComponent) public tasksComponent!: TasksComponent;
  public allowTaskCompletion$: Observable<boolean> | undefined;
  public allowTaskDeletion$: Observable<boolean> | undefined;
  public allowTaskUpdate$: Observable<boolean> | undefined;
  public showAddTaskButton$: Observable<boolean> | undefined;
  public enableCategoryFilter$: Observable<boolean> | undefined;
  public filterCategoryId: string = '';
  public isModalOpen = false;
  public config = HOME_CONFIG;
  public currentDate: Date = new Date();

  constructor(
    private taskService: TaskService,
    private remoteConfigService: RemoteConfigService
  ) {}

  public ngOnInit() {
    this.remoteConfigService.activateRemoteConfig().subscribe(() => {
      this.allowTaskCompletion$ = this.remoteConfigService.getBooleanValue$(
        'allowTaskCompletion'
      );
      this.allowTaskDeletion$ =
        this.remoteConfigService.getBooleanValue$('allowTaskDeletion');
      this.allowTaskUpdate$ =
        this.remoteConfigService.getBooleanValue$('allowTaskUpdate');
      this.showAddTaskButton$ =
        this.remoteConfigService.getBooleanValue$('showAddTaskButton');
      this.enableCategoryFilter$ = this.remoteConfigService.getBooleanValue$(
        'enableCategoryFilter'
      );
    });
    this.loadTasks();
  }

  public loadTasks() {
    this.tasksComponent.loadTasks();
  }

  public addTask(taskData: {
    title: string;
    categoryId?: string;
    date?: string;
  }) {
    this.taskService.addTask(
      taskData.title,
      taskData.categoryId,
      undefined,
      taskData.date
    );
    this.loadTasks();
    this.setOpen(false);
  }

  public toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks();
  }

  public deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
