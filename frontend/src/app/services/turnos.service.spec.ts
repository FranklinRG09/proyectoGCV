import { TestBed } from '@angular/core/testing';

import { TurnosService } from './turnos.service';

describe('TurnosService', () => {
  let service: TurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
