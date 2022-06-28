import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaSideNavComponent } from './vcita-side-nav.component';

describe('VcitaSideNavComponent', () => {
  let component: VcitaSideNavComponent;
  let fixture: ComponentFixture<VcitaSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcitaSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
