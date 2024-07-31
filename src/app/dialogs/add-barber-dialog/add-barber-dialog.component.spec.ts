import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarberDialogComponent } from './add-barber-dialog.component';

describe('AddBarberDialogComponent', () => {
  let component: AddBarberDialogComponent;
  let fixture: ComponentFixture<AddBarberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBarberDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBarberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
