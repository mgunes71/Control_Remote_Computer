import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
import {BaseComponent} from "../../../../../core/components/base.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends BaseComponent {
  loading = false;
  showReferral = true;

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  }, {validators: this.passwordMatchValidator});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    super();
  }

  override async ngOnInit(): Promise<void> {

  }

  async signUp() {
    this.loading = true;
    const formValues = this.form.value;
    delete formValues.termsAccept;
    delete formValues.confirmPassword;

    const [err, token] = await this.authService.getApi().register(formValues).toArray();

    console.log(token);

    if (err || !token) {
      this.loading = false;
      return;
    }

    await this.authService.authenticate(token).finally(() => {
      this.loading = false;
    });
  }


  passwordMatchValidator(control: FormGroup) {
    const password = control.controls['password'];
    const confirmPassword = control.controls['confirmPassword'];

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get password() { return this.form.get('password'); }
  get confirm_password() { return this.form.get('confirmPassword'); }
}
