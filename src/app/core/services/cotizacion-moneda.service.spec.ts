import { TestBed } from '@angular/core/testing';

import { CotizacionMonedaService } from './cotizacion-moneda.service';

describe('CotizacionMonedaService', () => {
  let service: CotizacionMonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionMonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
