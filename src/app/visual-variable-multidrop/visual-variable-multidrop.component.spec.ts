import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualVariableMultidropComponent } from './visual-variable-multidrop.component';

describe('VisualVariableMultidropComponent', () => {
  let component: VisualVariableMultidropComponent;
  let fixture: ComponentFixture<VisualVariableMultidropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualVariableMultidropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualVariableMultidropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
