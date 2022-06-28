import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaAppPartnerPageComponent } from './vcita-app-partner-page.component';

describe('VcitaAppPartnerPageComponent', () => {
  let component: VcitaAppPartnerPageComponent;
  let fixture: ComponentFixture<VcitaAppPartnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcitaAppPartnerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaAppPartnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
