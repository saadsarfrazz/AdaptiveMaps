import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartMapComponent } from './piechart-map.component';

describe('PiechartMapComponent', () => {
  let component: PiechartMapComponent;
  let fixture: ComponentFixture<PiechartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
