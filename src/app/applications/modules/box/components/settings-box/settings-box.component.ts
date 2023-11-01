import {Component, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from "../../../../../core/components/base.component";

@Component({
  selector: 'app-settings-box',
  templateUrl: './settings-box.component.html',
  styleUrls: ['./settings-box.component.scss']
})
export class SettingsBoxComponent extends BaseComponent {
  @Output() text = new EventEmitter<any>();
  @Output() backgroundColor = new EventEmitter<any>();
  @Output() textColor = new EventEmitter<any>();

  constructor() {
    super();
  }

  override async ngOnInit(): Promise<void> {

  }

  setTextColor(event: any) {
    this.textColor.emit(event.target.value);
  }

  setBgColor(event: any) {
    this.backgroundColor.emit(event.target.value);
  }

  setText(event: any) {
    if (event.target.value.trim() === '') {
      this.text.emit()
      return
    }
    this.text.emit(event.target.value);
  }
}
