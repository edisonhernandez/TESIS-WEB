import { TestBed } from '@angular/core/testing';

import { AyudaService } from './ayuda.service';

describe('AyudaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AyudaService = TestBed.get(AyudaService);
    expect(service).toBeTruthy();
  });
});
