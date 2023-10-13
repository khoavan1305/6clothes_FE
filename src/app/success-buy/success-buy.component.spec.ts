import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBuyComponent } from './success-buy.component';

describe('SuccessBuyComponent', () => {
  let component: SuccessBuyComponent;
  let fixture: ComponentFixture<SuccessBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessBuyComponent]
    });
    fixture = TestBed.createComponent(SuccessBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
