import { Component } from '@angular/core';
import {SocketService} from "./core/modules/socket/services/socket.service";
import {environment} from "../environment/environment";
import {AuthenticationService} from "./applications/modules/authentication/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'touch_control_front_End';

  constructor(private socketService: SocketService, private authService: AuthenticationService) {
    this.authService.Initialize();
    this.socketService.startWebSocket(environment.apiBaseUrl, {});
  }
}
