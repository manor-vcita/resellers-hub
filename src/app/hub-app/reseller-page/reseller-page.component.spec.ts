import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerPageComponent } from './reseller-page.component';

describe('ResellerPageComponent', () => {
  let component: ResellerPageComponent;
  let fixture: ComponentFixture<ResellerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
