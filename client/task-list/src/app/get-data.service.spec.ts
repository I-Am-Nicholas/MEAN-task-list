import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { GetDataService } from './get-data.service';


describe('GetDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        GetDataService
      ]
    });
  }));

  it('should be created', inject([GetDataService], (service: GetDataService) => {
    expect(service).toBeTruthy();
  }));

  it('can use service as an instance of GetDataService',
    inject([GetDataService], (service: GetDataService) => {
      expect(service instanceof GetDataService).toBe(true);
  }));

  it("can instantiate the service with 'new'", inject([Http], (http: Http) => {
    expect(http).not.toBeNull();
    let service = new GetDataService(http);
    expect(service instanceof GetDataService).toBe(true);
  }));

});
