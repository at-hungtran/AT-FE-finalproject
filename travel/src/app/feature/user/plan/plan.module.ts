import { NgModule } from '@angular/core';
import { PlanComponent } from './plan.component';
import { PlanRoutingModule } from './plan-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})

export class PlanModule {}
