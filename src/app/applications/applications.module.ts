import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModule} from "./modules/authentication/auth.module";
import {PageModule} from "./modules/page/page.module";
import {BoxModule} from "./modules/box/box.module";
import {RemoteScreenModule} from "./modules/remote-screen/remote-screen.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    PageModule,
    BoxModule,
    RemoteScreenModule
  ]
})
export class ApplicationsModule { }
