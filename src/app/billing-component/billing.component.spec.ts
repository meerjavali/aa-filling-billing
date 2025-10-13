import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingComponentComponent } from './billing.component';

describe('BillingComponentComponent', () => {
  let component: BillingComponentComponent;
  let fixture: ComponentFixture<BillingComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingComponentComponent]
    });
    fixture = TestBed.createComponent(BillingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
