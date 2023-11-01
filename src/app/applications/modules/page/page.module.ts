import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './pages/page.component';
import {PageRoutingModule} from "./page-routing.module.";
import {SharedModule} from "../../../shared/shared.module";
import { CreatePageModalComponent } from './components/create-page-modal/create-page-modal.component';
import { UpdatePageModalComponent } from './components/update-page-modal/update-page-modal.component';



@NgModule({
  declarations: [
    PageComponent,
    CreatePageModalComponent,
    UpdatePageModalComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule
  ],
  exports: [PageRoutingModule]
})
export class PageModule { }
