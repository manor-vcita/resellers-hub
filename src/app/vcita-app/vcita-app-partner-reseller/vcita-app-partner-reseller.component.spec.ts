import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaAppPartnerResellerComponent } from './vcita-app-partner-reseller.component';

describe('VcitaAppPartnerResellerComponent', () => {
  let component: VcitaAppPartnerResellerComponent;
  let fixture: ComponentFixture<VcitaAppPartnerResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcitaAppPartnerResellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaAppPartnerResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
