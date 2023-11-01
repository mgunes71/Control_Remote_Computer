import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './box-routing.module';
import { BoxComponent } from './pages/box/box.component';
import {SharedModule} from "../../../shared/shared.module";
import { SettingsBoxComponent } from './components/settings-box/settings-box.component';
import { ConfigurationBoxComponent } from './components/configuration-box/configuration-box.component';
import { CreateBoxComponent } from './components/create-box/create-box.component';
import { UpdateConfigModalComponent } from './components/update-config.modal.ts/update-config-modal.component';


@NgModule({
  declarations: [
    BoxComponent,
    SettingsBoxComponent,
    ConfigurationBoxComponent,
    CreateBoxComponent,
    UpdateConfigModalComponent
  ],
  imports: [
    CommonModule,
    BoxRoutingModule,
    SharedModule
  ]
})
export class BoxModule { }
