import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../../../domain/models/task.model';
import { TaskService } from '../../../../application/services/task.service';

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

  constructor(private taskService: TaskService) {}

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

  saveTask() {
    if (this.allowTaskUpdate) {
      this.taskService.updateTask(this.task.id, {
        title: this.editableTask.title,
        categoryId: this.editableTask.categoryId,
        date: this.editableTask.date,
      });
      this.taskUpdated.emit(this.editableTask);
    }
  }

  clearDate() {
    if (this.allowTaskUpdate) {
      this.editableTask.date = null;
    }
  }
}
