import {Component} from '@angular/core';
import {BaseComponent} from "../../../../core/components/base.component";
import {PageService} from "../services/page.service";
import {UserService} from "../../../../shared/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatePageModalComponent} from "../components/create-page-modal/create-page-modal.component";
import {AlertService} from "../../../../shared/services/toastr.service";
import {ConfirmModalComponent} from "../../../../shared/components/modals/confirm-modal/confirm-modal.component";
import {UpdatePageModalComponent} from "../components/update-page-modal/update-page-modal.component";
import {BoxService} from "../../box/services/box.service";
import {CreateBoxComponent} from "../../box/components/create-box/create-box.component";
import {takeUntil} from "rxjs";

declare const $: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends BaseComponent {
  user: any;
  pages: any[] = [];
  defaultPage!: any;
  activePage: any;

  boxes: any[] = [];
  loading = false;


  constructor(private pageService: PageService, private boxService: BoxService, private userService: UserService, public dialog: MatDialog, private alertService: AlertService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.userService.$user.pipe(takeUntil(this.onDestroy$)).subscribe(u => {
      this.user = u;
    });

    this.pageService.$pages.subscribe((p) => {
      this.pages = p;
    });
    const [err, pages] = await this.pageService.setPages().toArray();
    if (err) {
      return;
    }

    console.log(pages)
    this.defaultPage = this.pages.find((p) => p.id === this.user.defaultPage);
    this.activePage = this.defaultPage;
    console.log(this.defaultPage, 1212)

    this.boxService.$boxes.subscribe((b) => {
      this.boxes = b;
    })

    await this.getAllBox(this.defaultPage.id);
  }

  async getAllBox(pageId: number) {
    const [err, boxes] = await this.boxService.getApi().getAllBox(pageId).toArray();
    if (err) return;

    this.boxes = boxes;
    console.log(this.boxes);
  }

  async createPage(): Promise<any> {
    const dialogRef = this.dialog.open(CreatePageModalComponent, {
      height: '300px',
      width: '600px'
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (!result || result.name.trim() === '') return;

      this.loading = true;
      const [err, created] = await this.pageService.getApi().createPage(result).toArray();
      if (err || !created) {
        this.loading = false;
        this.alertService.errorAlert({title: 'error', message: 'page not created'});
      }

      this.loading = false;
      this.alertService.successAlert({title: 'success', message: 'page created successfully'});
      await this.pageService.getApi().getPages();
    });
  }

  async deletePage(pageId: number): Promise<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: '300px',
      width: '400px'
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (!result) return;
      this.loading = true;
      const [err, deleted] = await this.pageService.getApi().deletePage(pageId).toArray();
      if (err || !deleted) {
        this.loading = false;
        this.alertService.errorAlert({title: 'error', message: 'page not deleted'});
      }

      this.loading = false;
      this.alertService.successAlert({title: 'success', message: 'page deleted successfully'});
    });
  }

  async setActivePage(page: any) {
    console.log(page)
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

  async updatePage(pageId: number) {
    const dialogRef = this.dialog.open(UpdatePageModalComponent, {
      height: '300px',
      width: '600px'
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (!result || result.name.trim() === '') return;

      this.loading = true;
      const [err, updated] = await this.pageService.getApi().updatePage(pageId, result).toArray();
      if (err || !updated) {
        this.loading = false;
        this.alertService.errorAlert({title: 'error', message: 'page not updated'});
      }

      this.loading = false;
      this.alertService.successAlert({title: 'success', message: 'page updated successfully'});
    });
  }

  setCol() {
    return 'col-6';
  }

  async createButton() {
    const dialogRef = this.dialog.open(CreateBoxComponent, {
      height: '300px',
      width: '600px'
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (!result || result.text.trim() === '') return;

      this.loading = true;
      const [err, created] = await this.boxService.getApi().createBox(this.activePage.id, result).toArray();
      if (err || !created) {
        this.loading = false;
        this.alertService.errorAlert({title: 'error', message: 'box not created'});
      }

      this.loading = false;
      await this.pageService.setPages();
      await this.boxService.setBox(this.activePage.id);
      this.alertService.successAlert({title: 'success', message: 'box created successfully'});
    });
  }
}
