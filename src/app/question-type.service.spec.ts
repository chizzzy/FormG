import { TestBed } from '@angular/core/testing';

import { QuestionTypeService } from './question-type.service';

describe('QuestionTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionTypeService = TestBed.get(QuestionTypeService);
    expect(service).toBeTruthy();
  });
});
