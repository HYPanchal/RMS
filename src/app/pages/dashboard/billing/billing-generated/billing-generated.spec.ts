import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingGenerated } from './billing-generated';

describe('BillingGenerated', () => {
  let component: BillingGenerated;
  let fixture: ComponentFixture<BillingGenerated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingGenerated],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingGenerated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
