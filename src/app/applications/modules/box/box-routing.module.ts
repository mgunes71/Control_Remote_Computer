import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoxComponent} from "./pages/box/box.component";

const routes: Routes = [
  {
    path: 'box/:pageId/:boxId',
    component: BoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxRoutingModule { }
