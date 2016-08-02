/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ResultListService } from './result-list.service';

describe('Service: ResultList', () => {
  beforeEach(() => {
    addProviders([ResultListService]);
  });

  it('should ...',
    inject([ResultListService],
      (service: ResultListService) => {
        expect(service).toBeTruthy();
      }));
});
