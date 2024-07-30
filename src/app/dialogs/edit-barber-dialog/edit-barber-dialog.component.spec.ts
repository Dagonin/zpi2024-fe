import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarberDialogComponent } from './edit-barber-dialog.component';

describe('EditBarberDialogComponent', () => {
  let component: EditBarberDialogComponent;
  let fixture: ComponentFixture<EditBarberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBarberDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBarberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
