import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../../application/services/task.service';
import { Task } from '../../../../domain/models/task.model';
import { TASKS_CONFIG } from './tasks.config';

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

  page: number = 0;
  pageSize: number = 20;
  totalTasks: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.page = 0;
    this.tasks = this.taskService.getTasks(0, this.pageSize);
    this.totalTasks = this.getFilteredTasks().length;

    this.filteredTasks = this.getFilteredTasks().slice(0, this.pageSize);
  }

  loadMoreTasks(event: any) {
    this.page++;

    const nextTasks = this.taskService.getTasks(this.page, this.pageSize);

    this.filteredTasks = [...this.filteredTasks, ...nextTasks];

    event.target.complete();

    if (this.filteredTasks.length >= this.totalTasks) {
      event.target.disabled = true;
    }
  }

  getFilteredTasks(): Task[] {
    if (this.filterCategoryId.trim() === '') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.categoryId === this.filterCategoryId);
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
