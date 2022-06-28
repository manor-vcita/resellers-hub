import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubTopNavComponent } from './hub-top-nav.component';

describe('HubTopNavComponent', () => {
  let component: HubTopNavComponent;
  let fixture: ComponentFixture<HubTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
