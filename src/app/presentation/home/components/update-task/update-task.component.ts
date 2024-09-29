import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../../../domain/models/task.model';
import { TaskService } from '../../../../application/services/task.service';
import { UPDATE_TASK_CONFIG } from './update-task.config';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  @Input() public task!: Task;
  @Input() public allowTaskUpdate: boolean | null = null;
  @Output() public taskUpdated = new EventEmitter<Task>();
  public editableTask!: Task;
  public config = UPDATE_TASK_CONFIG;

  constructor(
    private taskService: TaskService,
    private alertController: AlertController
  ) {}

  public ngOnInit() {
    this.editableTask = new Task(
      this.task.id,
      this.task.title,
      this.task.status,
      this.task.categoryId,
      this.task.createdAt,
      this.task.date
    );
  }

  public async saveTask() {
    if (this.allowTaskUpdate && this.editableTask.title.trim()) {
      this.taskService.updateTask(this.task.id, {
        title: this.editableTask.title,
        categoryId: this.editableTask.categoryId,
        date: this.editableTask.date,
      });
      this.taskUpdated.emit(this.editableTask);
    } else {
      const alert = await this.alertController.create({
        header: this.config.ALERTS.TITLE,
        message: this.config.ALERTS.MESSAGE,
        buttons: [this.config.ALERTS.BUTTON],
      });
      await alert.present();
    }
  }

  public clearDate() {
    if (this.allowTaskUpdate) {
      this.editableTask.date = null;
    }
  }
}
