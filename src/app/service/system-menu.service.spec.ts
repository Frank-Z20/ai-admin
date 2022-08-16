import { TestBed } from '@angular/core/testing';

import { SystemMenuService } from './system-menu.service';

describe('SystemMenuService', () => {
  let service: SystemMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
