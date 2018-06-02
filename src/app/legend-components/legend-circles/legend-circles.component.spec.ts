import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendCirclesComponent } from './legend-circles.component';

describe('LegendCirclesComponent', () => {
  let component: LegendCirclesComponent;
  let fixture: ComponentFixture<LegendCirclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendCirclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
