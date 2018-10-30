import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { GiphyService } from './app/giphy.service';

const giphyAPIKey = 'fakeAPIkey';

describe('GiphyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
     providers: [ BaseRequestOptions,
                  MockBackend,
                  GiphyService,
                  { provide: Http,
                    useFactory: (backend: ConnectionBackend,
                                 defaultOptions: BaseRequestOptions) => {
                                 return new Http(backend, defaultOptions); },
                    deps: [MockBackend, BaseRequestOptions] },
                  ]
            });
    });
  );




function expectUrl(nackend: MockBackend, url: string){
  backend.connections.subscribe(c => {
    expect(c.request.url).toBe(url);
    const response = new ResponseOptions({body: '{"img_url": "http://img_url"}'});
    c.mockRespond(new Response(response));
  })
}



describe('search', () => {
    it('searchs for gif based on search term',
      inject([GiphyService, MockBackend], fakeAsync((giphyService, mockBackend) => {
        let res;
        expectURL(mockBackend,  `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=searchText&limit=5`);
        svc.search('searchText').subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res.img_url).toBe('http://img_url');
      }))
    );

    it('fails if missing api key',
      inject([GiphyService, MockBackend], fakeAsync((giphyService, mockBackend) => {
        let res;
        expectURL(mockBackend,  `https://api.giphy.com/v1/gifs/search?api_key=q=searchText&limit=5`);
        svc.search('searchText').subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res.img_url).toBe('404 error');
      }))
    );

  });

  it('should be created', () => {
    const service: GiphyService = TestBed.get(GiphyService);
    expect(service).toBeTruthy();
  });
});
