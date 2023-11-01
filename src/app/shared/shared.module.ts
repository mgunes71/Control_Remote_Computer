import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiKitModule} from "./modules/ui-kit/ui-kit.module";
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { ActionInputComponent } from './inputs/action-input/action-input.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    HeaderComponent, LayoutComponent, ConfirmModalComponent, ActionInputComponent, KeyboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UiKitModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      progressBar: true,
      preventDuplicates: true
    }),
  ],
  exports: [
    HeaderComponent,
    LayoutComponent,
    UiKitModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ActionInputComponent,KeyboardComponent
  ]
})
export class SharedModule {
}
