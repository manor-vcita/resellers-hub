import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaTopNavComponent } from './vcita-top-nav.component';

describe('VcitaTopNavComponent', () => {
  let component: VcitaTopNavComponent;
  let fixture: ComponentFixture<VcitaTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcitaTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
