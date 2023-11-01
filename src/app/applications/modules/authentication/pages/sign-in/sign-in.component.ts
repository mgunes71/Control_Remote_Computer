import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  loading = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {
  }

  public async login() {
    console.log(this.form.value)
    this.loading = true;
    const {email, password} = this.form.value;
    const [err, token] = await this.authService.getApi().loginWithEmail({email,password}).toArray();
    console.log(token)

    if (err || !token) {
      this.loading = false;
      return;
    }

    await this.authService.authenticate(token).finally(() => {
      this.loading = false;
    });

  }
}
