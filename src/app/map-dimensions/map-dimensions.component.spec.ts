import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDimensionsComponent } from './map-dimensions.component';

describe('MapDimensionsComponent', () => {
  let component: MapDimensionsComponent;
  let fixture: ComponentFixture<MapDimensionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDimensionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
