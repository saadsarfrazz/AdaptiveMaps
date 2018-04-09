import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicmapComponent } from './basicmap.component';

describe('BasicmapComponent', () => {
  let component: BasicmapComponent;
  let fixture: ComponentFixture<BasicmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
