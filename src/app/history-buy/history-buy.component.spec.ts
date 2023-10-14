import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBuyComponent } from './history-buy.component';

describe('HistoryBuyComponent', () => {
  let component: HistoryBuyComponent;
  let fixture: ComponentFixture<HistoryBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryBuyComponent]
    });
    fixture = TestBed.createComponent(HistoryBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
