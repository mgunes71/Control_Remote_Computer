import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RemoteComponent} from "./pages/remote/remote.component";

const routes: Routes = [
  {
    path: 'remote',
    component: RemoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteScreenRoutingModule { }
