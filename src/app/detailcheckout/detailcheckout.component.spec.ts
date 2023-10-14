import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcheckoutComponent } from './detailcheckout.component';

describe('DetailcheckoutComponent', () => {
  let component: DetailcheckoutComponent;
  let fixture: ComponentFixture<DetailcheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailcheckoutComponent]
    });
    fixture = TestBed.createComponent(DetailcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
