import { TestBed } from '@angular/core/testing';

import { PedagogicSupportService } from './pedagogic-support.service';

describe('PedagogicSupportService', () => {
  let service: PedagogicSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedagogicSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
