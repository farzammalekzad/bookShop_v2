import { TestBed } from '@angular/core/testing';

import { DownloadBookService } from './download-book.service';

describe('DownloadBookService', () => {
  let service: DownloadBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
