import { Component } from '@angular/core';
import { ADD_TASK_CONFIG } from './add-task.config';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  newTaskTitle: string = '';
  newTaskCategoryId: string = '';

  config = ADD_TASK_CONFIG;

  @Output() addTask = new EventEmitter<{ title: string; categoryId?: string }>();

  onAddTask() {
    if (this.newTaskTitle.trim()) {
      const categoryId = this.newTaskCategoryId || undefined;
      this.addTask.emit({ title: this.newTaskTitle, categoryId });
      this.newTaskTitle = '';
      this.newTaskCategoryId = '';
    }
  }
}
