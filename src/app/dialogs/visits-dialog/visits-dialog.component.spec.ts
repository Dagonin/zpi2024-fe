import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsDialogComponent } from './visits-dialog.component';

describe('VisitsDialogComponent', () => {
  let component: VisitsDialogComponent;
  let fixture: ComponentFixture<VisitsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
