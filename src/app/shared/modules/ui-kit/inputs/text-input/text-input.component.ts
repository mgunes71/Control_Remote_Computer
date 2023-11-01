import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent
    },
    /*{
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TradeInputComponent
    }*/
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @ViewChild('inputContainer') inputContainer!: ElementRef<HTMLElement>;

  @Input() label: string | TemplateRef<any> | any = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  value: any = null;

  touched = false;
  disabled = false;

  onChange = (value: any) => {
  };

  onTouched = () => {
  };

  onValueChange($event: Event & any) {
    const value: any = $event.target.value;

    this.markAsTouched();
    if (!this.disabled) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  /*validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity
        }
      };
    }
  }*/

  clear() {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = '';
      this.onChange(this.value);
    }
  }

  canClear() {
    return this.value?.length >= 1;
  }

  loseFocus() {
    setTimeout(() => {
      this.inputContainer.nativeElement.classList.remove('active');
    }, 100);
  }

  isTemplate(label: string | TemplateRef<any>) {
    return label instanceof TemplateRef;
  }
}
