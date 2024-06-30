import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInfoDialogComponent } from './password-info-dialog.component';

describe('PasswordInfoDialogComponent', () => {
  let component: PasswordInfoDialogComponent;
  let fixture: ComponentFixture<PasswordInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
