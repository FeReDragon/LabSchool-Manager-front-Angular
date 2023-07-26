import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedagogicSupportRoutingModule } from './pedagogic-support-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedagogicSupportService } from '../services/pedagogic-support.service';

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    PedagogicSupportRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: EditComponent }])
  ],
  providers: [PedagogicSupportService]
})
export class PedagogicSupportModule { }
