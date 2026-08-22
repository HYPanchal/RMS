import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSignup } from './tenant-signup';

describe('TenantSignup', () => {
  let component: TenantSignup;
  let fixture: ComponentFixture<TenantSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantSignup],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
