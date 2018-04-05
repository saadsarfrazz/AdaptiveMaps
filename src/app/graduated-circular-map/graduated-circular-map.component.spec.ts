import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduatedCircularMapComponent } from './graduated-circular-map.component';

describe('GraduatedCircularMapComponent', () => {
  let component: GraduatedCircularMapComponent;
  let fixture: ComponentFixture<GraduatedCircularMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduatedCircularMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduatedCircularMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
