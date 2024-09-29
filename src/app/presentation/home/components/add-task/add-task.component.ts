import { Component, EventEmitter, Output } from '@angular/core';
import { ADD_TASK_CONFIG } from './add-task.config';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  newTaskTitle: string = '';
  newTaskCategoryId: string = '';
  newTaskDate: string | null = null;
  config = ADD_TASK_CONFIG;

  @Output() addTask = new EventEmitter<{
    title: string;
    categoryId?: string;
    date?: string;
  }>();

  constructor(private alertController: AlertController) {} // Añadimos AlertController

  async onAddTask() {
    if (this.newTaskTitle.trim()) {
      // Si el título está completo, emitimos el evento y reseteamos el formulario
      this.addTask.emit({
        title: this.newTaskTitle,
        categoryId: this.newTaskCategoryId || '',
        date: this.newTaskDate || undefined,
      });
      this.resetForm();
    } else {
      // Si el título está vacío, mostramos una alerta
      const alert = await this.alertController.create({
        header: this.config.ALERTS.TITLE,
        message: this.config.ALERTS.MESSAGE,
        buttons: [this.config.ALERTS.BUTTON],
      });
      await alert.present();
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
