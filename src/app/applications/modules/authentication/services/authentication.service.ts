import { Injectable } from '@angular/core';
import {AuthenticationApi} from "../api/authentication.api";
import {Router} from "@angular/router";
import {UserService} from "../../../../shared/services/user.service";
import {SocketService} from "../../../../core/modules/socket/services/socket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticate = false;
  pendingRegister: Nullable<any>;

  private async afterAuthenticationSuccess(): Promise<void> {
  }

  private async afterAuthenticationFailed(): Promise<void> {
  }

  constructor(
    private api: AuthenticationApi,
    private userService: UserService,
    private socketService: SocketService,
    private router: Router
  ) { }

  getApi(): AuthenticationApi {
    return this.api;
  }

  async Initialize(
    success = async () => {
    },
    error = async () => {
    }) {
    this.afterAuthenticationSuccess = success;
    this.afterAuthenticationFailed = error;

    const session = await this.getSession();

    if (!session) {
      await this.afterAuthenticationFailed();
      throw new Error();
    }

    await this.afterAuthenticationSuccess();

    setInterval(async () => {
      await this.getSession();
    }, 1000 * 60 * 5);
  }

  async getSession() {

    if (!localStorage.getItem('token')) return false;

    const [err, res] = await this.getApi().getSession().toArray();

    if (err || !res) {
      this.endSession();
      return false;
    }

    this.userService.setUser(res);
    this.isAuthenticate = true;

    return this.isAuthenticate;
  }


  endSession() {
    this.afterAuthenticationFailed();
    localStorage.removeItem('token');
    this.userService.setUser(null);
    this.socketService.endWebSocket();
    this.isAuthenticate = false;


    location.reload();
  }

  async authenticate(tokenDto: any) {
    localStorage.setItem('token', tokenDto.token);
    await this.getSession();

    await this.afterAuthenticationSuccess();
    await this.router.navigate(['/']);
  }

}
