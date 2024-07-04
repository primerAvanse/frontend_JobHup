import { TestBed } from '@angular/core/testing';

import { UserioService } from './userio.service';

describe('UserioService', () => {
  let service: UserioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
