import { TestBed, async, inject } from '@angular/core/testing';

import { OutFromFormGuard } from './out-from-form.guard';

describe('OutFromFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutFromFormGuard]
    });
  });

  it('should ...', inject([OutFromFormGuard], (guard: OutFromFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
