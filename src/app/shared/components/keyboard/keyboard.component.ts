import {Component, EventEmitter, Output} from '@angular/core';
import Keyboard from "simple-keyboard";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  value = '';
  keys: any = [];

  keyboard!: Keyboard;
  keyboardControlPad!: Keyboard;
  keyboardArrows!: Keyboard;
  keyboardNumPad!: Keyboard;
  keyboardNumPadEnd!: Keyboard;

  constructor(public dialogRef: MatDialogRef<KeyboardComponent> ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard(".simple-keyboard-main", {
      ...this.commonKeyboardOptions,
      /**
       * Layout by:
       * Sterling Butters (https://github.com/SterlingButters)
       */
      layout: {
        default: [
          "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
          "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
          "{tab} q w e r t y u i o p [ ] \\",
          "{capslock} a s d f g h j k l ; ' {enter}",
          "{shiftleft} z x c v b n m , . / {shiftright}",
          "leftcontrol rightcontrol home {altleft} {metaleft} {space} {metaright} {altright}"
        ],
      },
      display: {
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "backspace ⌫",
        "{enter}": "enter ↵",
        "{capslock}": "caps lock ⇪",
        "{shiftleft}": "shift ⇧",
        "{shiftright}": "shift ⇧",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "home": "Home",
        "rightcontrol":"CTRL Right",
        "leftcontrol":"CTRL Left"
      }
    });

    this.keyboardControlPad = new Keyboard(".simple-keyboard-control", {
      ...this.commonKeyboardOptions,
      layout: {
        default: [
        ]
      }
    });

    this.keyboardArrows = new Keyboard(".simple-keyboard-arrows", {
      ...this.commonKeyboardOptions,
      layout: {
        default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
      }
    });

    this.keyboardNumPad = new Keyboard(".simple-keyboard-numpad", {
      ...this.commonKeyboardOptions,
      layout: {
        default: [
          "{numlock} {numpaddivide} {numpadmultiply}",
          "{numpad7} {numpad8} {numpad9}",
          "{numpad4} {numpad5} {numpad6}",
          "{numpad1} {numpad2} {numpad3}",
          "{numpad0} {numpaddecimal}"
        ]
      }
    });

    this.keyboardNumPadEnd = new Keyboard(".simple-keyboard-numpadEnd", {
      ...this.commonKeyboardOptions,
      layout: {
        default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
      }
    });
  }

  commonKeyboardOptions = {
    onChange: (input: any) => this.onChange(input),
    onKeyPress: (button: any) => this.onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: true
  };

  onChange = (input: any) => {
    this.value = input;

    console.log("Input changed", input);
  };

  onKeyPress = (button: any) => {
    let value = '';
    if (button.includes('{')) {
      value = button.replace(/[{}]/g, '')
    } else {
      value = button;
    }

    const keyControl = this.keys.find((k: string) => {
      return k === value;
    });

    if (keyControl) {
      console.log(keyControl);
      return;
    }

    this.keys.push(value);

    this.onChange(value);
  };


  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  clearInput() {
    this.value = '';
    this.keys = [];
  }
}
