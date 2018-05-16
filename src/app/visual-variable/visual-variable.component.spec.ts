import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualVariableComponent } from './visual-variable.component';

describe('VisualVariableComponent', () => {
  let component: VisualVariableComponent;
  let fixture: ComponentFixture<VisualVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
