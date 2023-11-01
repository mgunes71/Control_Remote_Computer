import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteScreenRoutingModule } from './remote-screen-routing.module';
import { RemoteComponent } from './pages/remote/remote.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    RemoteComponent
  ],
  imports: [
    CommonModule,
    RemoteScreenRoutingModule,
    SharedModule
  ]
})
export class RemoteScreenModule { }
