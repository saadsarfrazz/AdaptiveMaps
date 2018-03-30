import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationTemplateComponent } from './visualization-template.component';

describe('VisualizationTemplateComponent', () => {
  let component: VisualizationTemplateComponent;
  let fixture: ComponentFixture<VisualizationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
