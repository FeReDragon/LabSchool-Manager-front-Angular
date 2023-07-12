import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListComponent } from '../students/list/list.component';
import { CreateComponent } from './create/create.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from '../core/core-routing.module';
import { HeaderComponent } from '../core/header/header.component';

@NgModule({
  declarations: [ListComponent, CreateComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CoreModule,
    FormsModule,
  ]
})
export class StudentsModule { }

