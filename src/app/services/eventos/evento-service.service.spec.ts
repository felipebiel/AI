import { TestBed } from '@angular/core/testing';

import { EventoServiceService } from './evento-service.service';

describe('EventoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventoServiceService = TestBed.get(EventoServiceService);
    expect(service).toBeTruthy();
  });
});
