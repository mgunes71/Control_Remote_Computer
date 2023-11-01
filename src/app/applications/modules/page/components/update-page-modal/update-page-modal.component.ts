import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-page-modal',
  templateUrl: './update-page-modal.component.html',
  styleUrls: ['./update-page-modal.component.scss']
})
export class UpdatePageModalComponent {
  loading = false;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });
  constructor(public dialogRef: MatDialogRef<UpdatePageModalComponent>, private readonly fb: FormBuilder,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
