import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaceDialogComponent } from './edit-place-dialog.component';

describe('EditPlaceDialogComponent', () => {
  let component: EditPlaceDialogComponent;
  let fixture: ComponentFixture<EditPlaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlaceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
