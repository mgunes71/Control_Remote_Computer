import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationBoxComponent } from './configuration-box.component';

describe('ConfigurationBoxComponent', () => {
  let component: ConfigurationBoxComponent;
  let fixture: ComponentFixture<ConfigurationBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationBoxComponent]
    });
    fixture = TestBed.createComponent(ConfigurationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
