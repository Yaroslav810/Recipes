import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationWindowModalComponent } from './identification-window-modal.component';

describe('IdentificationWindowModalComponent', () => {
  let component: IdentificationWindowModalComponent;
  let fixture: ComponentFixture<IdentificationWindowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificationWindowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationWindowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
