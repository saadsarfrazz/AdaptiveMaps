import { TestBed, inject } from '@angular/core/testing';

import { VisualizationProviderService } from './visualization-provider.service';

describe('VisualizationProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationProviderService]
    });
  });

  it('should be created', inject([VisualizationProviderService], (service: VisualizationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
