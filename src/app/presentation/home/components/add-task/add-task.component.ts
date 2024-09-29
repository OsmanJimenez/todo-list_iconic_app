import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  newTaskTitle: string = '';
  newTaskCategoryId: string = '';
  newTaskDate: string | null = null; // Campo opcional para la fecha

  @Output() addTask = new EventEmitter<{
    title: string;
    categoryId?: string;
    date?: string;
  }>();

  onAddTask() {
    if (this.newTaskTitle.trim()) {
      this.addTask.emit({
        title: this.newTaskTitle,
        categoryId: this.newTaskCategoryId || '',
        date: this.newTaskDate || undefined,
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.newTaskTitle = '';
    this.newTaskCategoryId = '';
    this.newTaskDate = null;
  }

  clearDate() {
    this.newTaskDate = null;
  }
}
