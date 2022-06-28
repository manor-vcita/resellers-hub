import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaMainComponent } from './vcita-main.component';

describe('VcitaMainComponent', () => {
  let component: VcitaMainComponent;
  let fixture: ComponentFixture<VcitaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcitaMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
