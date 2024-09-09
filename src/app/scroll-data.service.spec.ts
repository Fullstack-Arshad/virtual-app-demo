import { TestBed } from '@angular/core/testing';

import { ScrollDataService } from './scroll-data.service';

describe('ScrollDataService', () => {
  let service: ScrollDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
