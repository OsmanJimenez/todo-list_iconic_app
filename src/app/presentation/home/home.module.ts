import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, TasksComponent, AddTaskComponent, UpdateTaskComponent, CategoryFilterComponent],
})
export class HomePageModule {}
