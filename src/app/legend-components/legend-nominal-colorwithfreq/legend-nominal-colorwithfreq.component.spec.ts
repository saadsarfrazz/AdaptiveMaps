import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendNominalColorwithfreqComponent } from './legend-nominal-colorwithfreq.component';

describe('LegendNominalColorwithfreqComponent', () => {
  let component: LegendNominalColorwithfreqComponent;
  let fixture: ComponentFixture<LegendNominalColorwithfreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendNominalColorwithfreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendNominalColorwithfreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
