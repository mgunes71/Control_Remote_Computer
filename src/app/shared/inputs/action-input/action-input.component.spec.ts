import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInputComponent } from './action-input.component';

describe('ActionInputComponent', () => {
  let component: ActionInputComponent;
  let fixture: ComponentFixture<ActionInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionInputComponent]
    });
    fixture = TestBed.createComponent(ActionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
