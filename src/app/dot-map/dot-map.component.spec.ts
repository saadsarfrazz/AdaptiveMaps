import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotMapComponent } from './dot-map.component';

describe('DotMapComponent', () => {
  let component: DotMapComponent;
  let fixture: ComponentFixture<DotMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
