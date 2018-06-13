import { TestBed, inject } from '@angular/core/testing';

import { ModuleLoaderService } from './module-loader.service';

describe('ModuleLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleLoaderService]
    });
  });

  it('should be created', inject([ModuleLoaderService], (service: ModuleLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
