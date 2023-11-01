import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../../applications/modules/authentication/services/authentication.service";
import {Router} from "@angular/router";
import {BaseComponent} from "../../../core/components/base.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent {
  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router) {
    super();
  }

  async logout() {
    await this.authService.endSession();
    await this.router.navigate(['auth/sign-in']);
  }
}
