import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubSideNavComponent } from './hub-side-nav.component';

describe('HubSideNavComponent', () => {
  let component: HubSideNavComponent;
  let fixture: ComponentFixture<HubSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
