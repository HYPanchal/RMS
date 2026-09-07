import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPending } from './billing-pending';

describe('BillingPending', () => {
  let component: BillingPending;
  let fixture: ComponentFixture<BillingPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingPending],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingPending);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
