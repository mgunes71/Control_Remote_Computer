import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss']
})
export class CreateBoxComponent {
  loading = false;

  form: FormGroup = this.fb.group({
    text: ['', [Validators.required]],
    background: ['', [Validators.required]],
    color: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateBoxComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
