import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-config.modal.ts',
  templateUrl: './update-config-modal.component.html',
  styleUrls: ['./update-config-modal.component.scss']
})
export class UpdateConfigModalComponent {

  form: FormGroup = this.fb.group({
    value: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder,
              public dialogRef: MatDialogRef<UpdateConfigModalComponent>,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
