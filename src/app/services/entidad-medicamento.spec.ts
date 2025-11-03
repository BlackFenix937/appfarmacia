import { TestBed } from '@angular/core/testing';

import { EntidadMedicamento } from './entidad-medicamento';

describe('EntidadMedicamento', () => {
  let service: EntidadMedicamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadMedicamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
