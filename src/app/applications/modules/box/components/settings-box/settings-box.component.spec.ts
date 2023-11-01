import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBoxComponent } from './settings-box.component';

describe('SettingsBoxComponent', () => {
  let component: SettingsBoxComponent;
  let fixture: ComponentFixture<SettingsBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsBoxComponent]
    });
    fixture = TestBed.createComponent(SettingsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
