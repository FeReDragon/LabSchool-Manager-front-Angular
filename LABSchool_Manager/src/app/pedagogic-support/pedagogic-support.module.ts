import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedagogicSupportRoutingModule } from './pedagogic-support-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    PedagogicSupportRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class PedagogicSupportModule { }
