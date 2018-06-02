import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendNumericColorwithboundaryComponent } from './legend-numeric-colorwithboundary.component';

describe('LegendNumericColorwithboundaryComponent', () => {
  let component: LegendNumericColorwithboundaryComponent;
  let fixture: ComponentFixture<LegendNumericColorwithboundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendNumericColorwithboundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendNumericColorwithboundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
