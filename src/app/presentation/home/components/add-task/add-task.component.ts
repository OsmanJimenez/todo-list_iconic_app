import { Component, EventEmitter, Output } from '@angular/core';
import { ADD_TASK_CONFIG } from './add-task.config';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  public newTaskTitle: string = '';
  public newTaskCategoryId: string = '';
  public newTaskDate: string | null = null;
  public config = ADD_TASK_CONFIG;

  @Output() public addTask = new EventEmitter<{
    title: string;
    categoryId?: string;
    date?: string;
  }>();

  constructor(private alertController: AlertController) {}

  public async onAddTask() {
    if (this.newTaskTitle.trim()) {
      this.addTask.emit({
        title: this.newTaskTitle,
        categoryId: this.newTaskCategoryId || '',
        date: this.newTaskDate || undefined,
      });
      this.resetForm();
    } else {
      const alert = await this.alertController.create({
        header: this.config.ALERTS.TITLE,
        message: this.config.ALERTS.MESSAGE,
        buttons: [this.config.ALERTS.BUTTON],
      });
      await alert.present();
    }
  }

  public resetForm() {
    this.newTaskTitle = '';
    this.newTaskCategoryId = '';
    this.newTaskDate = null;
  }

  public clearDate() {
    this.newTaskDate = null;
  }
}
