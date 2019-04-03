import { TestBed } from '@angular/core/testing';

import { PollsListService } from './polls-list.service';

describe('PollsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollsListService = TestBed.get(PollsListService);
    expect(service).toBeTruthy();
  });
});
