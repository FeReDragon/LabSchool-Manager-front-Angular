import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListComponent } from '../students/list/list.component';
import { CreateComponent } from './create/create.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from '../core/core-routing.module';
import { HeaderComponent } from '../core/header/header.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    FilterPipe // Adicione o FilterPipe nas declarações
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CoreModule,
    FormsModule,
    CoreRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule { }
