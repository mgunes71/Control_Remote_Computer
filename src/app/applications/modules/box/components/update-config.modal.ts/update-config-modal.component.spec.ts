import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfigModalComponent } from './update-config-modal.component';

describe('UpdateConfigModalTsComponent', () => {
  let component: UpdateConfigModalComponent;
  let fixture: ComponentFixture<UpdateConfigModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateConfigModalComponent]
    });
    fixture = TestBed.createComponent(UpdateConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
