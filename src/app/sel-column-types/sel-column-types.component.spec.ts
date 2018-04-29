import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelColumnTypesComponent } from './sel-column-types.component';

describe('SelColumnTypesComponent', () => {
  let component: SelColumnTypesComponent;
  let fixture: ComponentFixture<SelColumnTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelColumnTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelColumnTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
