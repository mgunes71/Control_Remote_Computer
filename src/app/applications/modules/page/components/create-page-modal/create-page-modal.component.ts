import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-page-modal',
  templateUrl: './create-page-modal.component.html',
  styleUrls: ['./create-page-modal.component.scss']
})
export class CreatePageModalComponent {
  loading = false;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<CreatePageModalComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
