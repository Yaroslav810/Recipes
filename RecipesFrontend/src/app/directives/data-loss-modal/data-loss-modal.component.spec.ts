import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLossModalComponent } from './data-loss-modal.component';

describe('DataLossModalComponent', () => {
  let component: DataLossModalComponent;
  let fixture: ComponentFixture<DataLossModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLossModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLossModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
