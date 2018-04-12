import { TestBed, inject } from '@angular/core/testing';

import { BasicCalculationsService } from './basic-calculations.service';

describe('BasicCalculationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicCalculationsService]
    });
  });

  it('should be created', inject([BasicCalculationsService], (service: BasicCalculationsService) => {
    expect(service).toBeTruthy();
  }));
});
