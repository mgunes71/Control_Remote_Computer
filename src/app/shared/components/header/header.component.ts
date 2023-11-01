import {Component} from '@angular/core';
import {BaseComponent} from "../../../core/components/base.component";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../../applications/modules/authentication/services/authentication.service";
import {Router} from "@angular/router";
import {SocketService} from "../../../core/modules/socket/services/socket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  user: any;
  obsError: any[] = [];
  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router, private socketService: SocketService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.user = this.userService.$user.getValue();
    this.socketService.emit('connectToObs', 'sdfds');
    this.socketService.listen('obsConnectEvent', async (data: any) => {
      this.obsError.push(data);
      console.log(data)
    });
  }

}
