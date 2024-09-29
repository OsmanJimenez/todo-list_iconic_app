import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../../application/services/task.service';
import { Task } from '../../../../domain/models/task.model';
import { TASKS_CONFIG } from './tasks.config';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  config = TASKS_CONFIG;

  @Input() filterCategoryId: string = '';
  @Input() allowTaskDeletion: boolean | null = null;
  @Input() allowTaskUpdate: boolean | null = null;

  isEditTaskModalOpen = false;
  selectedTask!: Task;
  page: number = 0;
  pageSize: number = 20;
  totalTasks: number = 0;

  constructor(
    private taskService: TaskService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  ngOnChanges() {
    this.applyFilter();
  }

  loadTasks() {
    this.page = 0;
    this.tasks = this.taskService.getTasks(0, this.pageSize);
    this.totalTasks = this.tasks.length;
    this.applyFilter();
  }

  loadMoreTasks(event: any) {
    this.page++;
    const nextTasks = this.taskService.getTasks(this.page, this.pageSize);
    this.tasks = [...this.tasks, ...nextTasks];
    this.applyFilter();
    event.target.complete();

    if (this.filteredTasks.length >= this.totalTasks) {
      event.target.disabled = true;
    }
  }

  applyFilter() {
    const query = this.filterCategoryId.trim().toLowerCase();

    if (query === '') {
      this.filteredTasks = this.tasks.slice(0, (this.page + 1) * this.pageSize);
    } else {
      this.filteredTasks = this.tasks
        .filter(task => {
          const categoryMatch = task.categoryId?.toLowerCase().includes(query);
          const titleMatch = task.title?.toLowerCase().includes(query);
          return categoryMatch || titleMatch;
        })
        .slice(0, (this.page + 1) * this.pageSize);
    }
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task);
    this.loadTasks();
  }

  async presentDeleteConfirm(task: Task) {
    const alert = await this.alertController.create({
      header: this.config.TEXTS.DELETE_CONFIRM_HEADER,
      message: `${this.config.TEXTS.DELETE_CONFIRM_MESSAGE.replace('{title}', task.title).replace('{category}', task.categoryId || this.config.TEXTS.NO_CATEGORY_TEXT)}`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.config.BUTTONS.CANCEL.TEXT,
          role: 'cancel',
          handler: () => {
            console.log(this.config.TEXTS.DELETE_CANCELLED);
          },
        },
        {
          text: this.config.BUTTONS.DELETE_TASK.TEXT,
          role: 'confirm',
          handler: () => {
            this.deleteTask(task.id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteTask(taskId: string) {
    if (this.allowTaskDeletion) {
      this.taskService.deleteTask(taskId);
      this.loadTasks();
    }
  }

  openEditTaskModal(task: Task) {
    this.selectedTask = new Task(
      task.id,
      task.title,
      task.status,
      task.categoryId,
      task.createdAt,
      task.date
    );
    this.isEditTaskModalOpen = true;
  }

  closeEditTaskModal() {
    this.isEditTaskModalOpen = false;
  }

  onTaskUpdated(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    this.applyFilter();
    this.closeEditTaskModal();
  }
}
