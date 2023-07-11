import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedagogicSupportRoutingModule } from './pedagogic-support-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PedagogicSupportRoutingModule
  ]
})
export class PedagogicSupportModule { }
