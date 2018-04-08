import { TestBed, inject } from '@angular/core/testing';

import { RecruitService } from './recruit.service';

describe('RecruitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruitService]
    });
  });

  it('should be created', inject([RecruitService], (service: RecruitService) => {
    expect(service).toBeTruthy();
  }));
});
