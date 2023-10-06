import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForGetPasswordComponent } from './for-get-password.component';

describe('ForGetPasswordComponent', () => {
  let component: ForGetPasswordComponent;
  let fixture: ComponentFixture<ForGetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForGetPasswordComponent]
    });
    fixture = TestBed.createComponent(ForGetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
