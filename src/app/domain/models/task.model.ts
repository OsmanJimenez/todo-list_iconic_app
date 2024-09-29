export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public status: TaskStatus = TaskStatus.Pending,
    public categoryId?: string,
    public createdAt: Date = new Date()
  ) {}

  setStatus(newStatus: TaskStatus): void {
    this.status = newStatus;
  }
}

export enum TaskStatus {
  Pending = 'PENDING',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Canceled = 'CANCELED',
}
