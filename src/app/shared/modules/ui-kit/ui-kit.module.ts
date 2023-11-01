import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordInputComponent} from "./inputs/password-input/password-input.component";
import {TextInputComponent} from "./inputs/text-input/text-input.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";



const declaration = [
  PasswordInputComponent,
  TextInputComponent
];

const modules: any = [
  MatSlideToggleModule,
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatMenuModule
]


@NgModule({
  declarations: [...declaration],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules, ...declaration]
})
export class UiKitModule { }
