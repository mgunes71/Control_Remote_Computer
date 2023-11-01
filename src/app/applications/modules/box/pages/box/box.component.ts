import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../../../../core/components/base.component";
import {BoxService} from "../../services/box.service";
import {MatDialog} from "@angular/material/dialog";
import {KeyboardComponent} from "../../../../../shared/components/keyboard/keyboard.component";
import {AlertService} from "../../../../../shared/services/toastr.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent extends BaseComponent{
  boxId: any;
  pageId: any;
  customInput: any[] = [];

  boxDetail = {
    text: '',
    textColor: '',
    backgroundColor: '',
  }

  actionId: number = 1;
  label: string = '';
  actionType: string = '';

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private dialog: MatDialog, private alertService: AlertService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.boxId = this.activatedRoute.snapshot.params['boxId'];
    this.pageId = this.activatedRoute.snapshot.params['pageId'];
  }

  addInput(actionId: number, label: string, type: string) {
    this.customInput.push('');
    this.actionId = actionId;
    this.label = label;
    this.actionType = type;
  }

  async openKeyboard() {
    const dialogRef = this.dialog.open(KeyboardComponent, {
      height: '800px',
      width: '800px'
    });

    await dialogRef.afterClosed().subscribe((async (result: any[]) => {
      console.log(result)
      if (result.length === 0) return;

      const configArray = result.join('+');
      console.log(configArray)

      const configDto = {
        title: 'keyPress',
        value: configArray,
        type: 0
      }

      const [err, config] = await this.boxService.getApi().createBoxConfig(configDto, this.actionId, this.boxId).toArray();
      if (err) {
        this.alertService.errorAlert({title: 'error', message: 'add action not successfully'});
        return
      }

      await this.boxService.setBoxConfig(this.boxId);
      this.alertService.successAlert({title: 'success', message: 'add action successfully'});
    }));
  }

  deleteInput() {
    this.customInput = [];
  }

  async updateBox() {
    const boxDto = {
    }
  }

  setBackground(event: any) {
    this.boxDetail.backgroundColor = event;
  }

  setText(event: any) {
    this.boxDetail.text = event;
  }

  setTextColor(event: any) {
    this.boxDetail.textColor = event;
  }
}
