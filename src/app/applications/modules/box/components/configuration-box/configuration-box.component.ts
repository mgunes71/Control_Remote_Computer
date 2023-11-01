import {Component, Input} from '@angular/core';
import {BaseComponent} from "../../../../../core/components/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BoxService} from "../../services/box.service";
import {AlertService} from "../../../../../shared/services/toastr.service";
import {UpdateConfigModalComponent} from "../update-config.modal.ts/update-config-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-configuration-box',
  templateUrl: './configuration-box.component.html',
  styleUrls: ['./configuration-box.component.scss']
})
export class ConfigurationBoxComponent extends BaseComponent{
  @Input() actionId: number = 0;
  @Input() label: string = '';
  @Input() customInputCount:any = [];
  @Input() actionType = 'onPress'

  @Input() boxDetail: any = {};

  configActionValue = '';
  box: any;
  boxConfig: any;

  pageId: any;

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private alertService: AlertService, private router: Router, public dialog: MatDialog,) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    const {pageId, boxId} = this.activatedRoute.snapshot.params;
    this.pageId = pageId;

    const [err, box] = await this.boxService.getApi().getBoxDetail(pageId, boxId).toArray();
    if (err) {
      return ;
    }
    this.box = box;

    this.boxService.$boxConfig.subscribe((c) => {
      this.boxConfig = c;
    })

    const [errconfig, config] = await this.boxService.setBoxConfig(boxId).toArray();
    if (errconfig) {
      return ;
    }
    this.boxConfig = config;
    this.actionType = 'onPress'
  }

  activeActionMenu(actionType: string) {
    this.actionType = actionType;
  }

  deleteInput() {
    this.customInputCount = [];
  }

  async save(type: string) {
    const configDto = {
      title: this.label,
      value: this.configActionValue,
      type: type
    }

    const [err, config] = await this.boxService.getApi().createBoxConfig(configDto, this.actionId, this.box.id).toArray();
    if (err) {
      this.alertService.errorAlert({title: 'error', message: 'add action not successfully'});
      return
    }

    await this.boxService.setBoxConfig(this.box.id);
    this.alertService.successAlert({title: 'success', message: 'add action successfully'});
  }

  takeValue($event: string) {
    this.configActionValue = $event;
  }

  async deleteConfig(id: number) {
    const [err,deleted] = await this.boxService.getApi().deleteConfigBox(this.box.id, id).toArray();

    if (err) {
      await this.alertService.successAlert({title: 'error', message: 'config not deleted'});
      return
    }

    await this.boxService.setBoxConfig(this.box.id);
    await this.alertService.successAlert({title: 'success', message: 'config deleted'});

  }

  async deleteBox() {
    const [err,deleted] = await this.boxService.getApi().deleteBox(this.pageId, this.box.id).toArray();

    if (err) {
      return
    }

    await this.alertService.successAlert({title: 'success', message: 'box deleted'});
    await this.router.navigate(['/pages']);
  }

  async editConfig(boxId: number, id: number) {
    const dialogRef = this.dialog.open(UpdateConfigModalComponent, {
      height: '300px',
      width: '600px'
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (!result || result.value.trim() === '') return;

      const [err, created] = await this.boxService.getApi().updateConfig(boxId, id, result).toArray();
      if (err || !created) {
        this.alertService.errorAlert({title: 'error', message: 'page not created'});
      }

      await this.boxService.setBoxConfig(boxId);
      this.alertService.successAlert({title: 'success', message: 'page created successfully'});

    });
  }

  async updateBox() {
    const boxDto = {
      text: this.boxDetail.text,
      background: this.boxDetail.backgroundColor,
      color: this.boxDetail.textColor,
    };

    const [err, updated] = await this.boxService.getApi().updateBox(this.pageId, this.box.id, boxDto).toArray();

    if (err) {
      this.alertService.errorAlert({title: 'error', message: 'update is failed'})
    }

    await this.boxService.setBoxConfig(this.box.id);
    await this.alertService.successAlert({title: 'success', message: 'update box successfully'});
  }
}
