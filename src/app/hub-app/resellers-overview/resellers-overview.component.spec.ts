import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellersOverviewComponent } from './resellers-overview.component';

describe('ResellersOverviewComponent', () => {
  let component: ResellersOverviewComponent;
  let fixture: ComponentFixture<ResellersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellersOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
