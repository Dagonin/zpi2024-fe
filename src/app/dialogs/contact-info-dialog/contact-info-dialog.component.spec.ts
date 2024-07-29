import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoDialogComponent } from './contact-info-dialog.component';

describe('ContactInfoDialogComponent', () => {
  let component: ContactInfoDialogComponent;
  let fixture: ComponentFixture<ContactInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
