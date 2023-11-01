import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePageModalComponent } from './update-page-modal.component';

describe('UpdatePageModalComponent', () => {
  let component: UpdatePageModalComponent;
  let fixture: ComponentFixture<UpdatePageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePageModalComponent]
    });
    fixture = TestBed.createComponent(UpdatePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
