import { TestBed, inject } from '@angular/core/testing';

import { LoadsurveyService } from './loadsurvey.service';

describe('LoadsurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadsurveyService]
    });
  });

  it('should be created', inject([LoadsurveyService], (service: LoadsurveyService) => {
    expect(service).toBeTruthy();
  }));
});
