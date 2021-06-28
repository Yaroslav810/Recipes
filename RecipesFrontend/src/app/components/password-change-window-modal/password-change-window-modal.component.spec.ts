import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeWindowModalComponent } from './password-change-window-modal.component';

describe('PasswordChangeWindowModalComponent', () => {
  let component: PasswordChangeWindowModalComponent;
  let fixture: ComponentFixture<PasswordChangeWindowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeWindowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeWindowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
