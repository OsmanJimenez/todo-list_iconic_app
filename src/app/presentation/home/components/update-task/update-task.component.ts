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
  @Output() taskUpdated = new EventEmitter<Task>();
  editableTask!: Task; // Se crea una copia editable de la tarea

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Crear una nueva instancia de Task en lugar de usar el spread operator
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
    this.taskService.updateTask(this.task.id, {
      title: this.editableTask.title,
      categoryId: this.editableTask.categoryId,
      date: this.editableTask.date,
    });

    // Emitimos el evento para que la lista de tareas sea actualizada
    this.taskUpdated.emit(this.editableTask);
  }

  clearDate() {
    // Limpiar la fecha seleccionada
    this.editableTask.date = null;
  }
}
