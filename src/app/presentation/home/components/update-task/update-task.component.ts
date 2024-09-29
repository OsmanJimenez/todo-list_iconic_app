import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../../../domain/models/task.model';
import { TaskService } from '../../../../application/services/task.service';
import { UPDATE_TASK_CONFIG } from './update-task.config';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() allowTaskUpdate: boolean | null = null;
  @Output() taskUpdated = new EventEmitter<Task>();
  editableTask!: Task;
  config = UPDATE_TASK_CONFIG;

  constructor(
    private taskService: TaskService,
    private alertController: AlertController // Añadimos AlertController
  ) {}

  ngOnInit() {
    this.editableTask = new Task(
      this.task.id,
      this.task.title,
      this.task.status,
      this.task.categoryId,
      this.task.createdAt,
      this.task.date
    );
  }

  async saveTask() {
    if (this.allowTaskUpdate && this.editableTask.title.trim()) {
      // Si el título está completo, actualizamos la tarea
      this.taskService.updateTask(this.task.id, {
        title: this.editableTask.title,
        categoryId: this.editableTask.categoryId,
        date: this.editableTask.date,
      });
      this.taskUpdated.emit(this.editableTask);
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

  clearDate() {
    if (this.allowTaskUpdate) {
      this.editableTask.date = null;
    }
  }
}
