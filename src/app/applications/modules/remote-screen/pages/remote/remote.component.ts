import {Component} from '@angular/core';
import {BaseComponent} from "../../../../../core/components/base.component";
import {BoxService} from "../../../box/services/box.service";
import {PageService} from "../../../page/services/page.service";
import {UserService} from "../../../../../shared/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/toastr.service";
import {SocketService} from "../../../../../core/modules/socket/services/socket.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent extends BaseComponent {
  user: any;
  pages: any[] = [];
  defaultPage!: any;
  activePage: any;

  boxes: any[] = [];
  loading = false;
  activeBox: string = '';

  constructor(private pageService: PageService, private boxService: BoxService, private userService: UserService, public dialog: MatDialog, private alertService: AlertService,
                private socketService: SocketService
              ) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.socketService.listen('current-scene', (data: any) => {
      console.log(data);
      this.activeBox = data;
    })

    this.userService.$user.pipe(takeUntil(this.onDestroy$)).subscribe(u => {
      this.user = u;
    });
    const [err, pages] = await this.pageService.getApi().getPages().toArray();
    if (err) {
      return ;
    }

    this.pages = pages;
    this.defaultPage = this.pages.find((p) => p.id === this.user.defaultPage);
    this.activePage = this.defaultPage;

    await this.getAllBox(this.defaultPage.id);
  }

  async getAllBox(pageId: number) {
    const [err, boxes] = await this.boxService.getApi().getAllBox(pageId).toArray();
    if (err) return;

    this.boxes = boxes;
    console.log(this.boxes);
  }

  async setActivePage(page: any) {
    this.activePage = page;
    await this.getAllBox(page.id);
  }

  async setDefaultPage(pageId: number) {
    this.loading = true;
    const [err, data] = await this.pageService.getApi().setDefaultPage(pageId).toArray();
    if (err) {
      this.loading = false;
      this.alertService.errorAlert({title: 'error', message: 'page not set'});
    }

    this.loading = false;
    this.alertService.successAlert({title: 'success', message: 'page deleted successfully'});
  }

  async runAction(boxId: number) {
    const [err, action] = await this.boxService.getApi().runAction(boxId).toArray();
    if (err) {
      return
    }
  }

  setCol() {
    const wd = window.innerWidth;
    const hg = window.innerHeight;

    // const buttonHeight = hg / 3;
    const buttonWidth = wd / 4;

    // return `${buttonWidth}px`;
    return 'col-3';
  }
}
