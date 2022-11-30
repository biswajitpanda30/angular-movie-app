import { Search } from 'src/app/shared/data/common/search';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TvSeriesService } from './tv-series.service';

describe('TvSeriesService', () => {
  let service: TvSeriesService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpSpy,
        },
        {
          provide: TvSeriesService,
        },
      ],
    });
    service = TestBed.inject(TvSeriesService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('serachByTitleAndType', () => {
    let mockSearch: Search = {
      Search: [
        {
          Title: 'test',
          Year: '2022',
          imdbID: '123',
          Type: 'series',
          Poster: 'string',
        },
        {
          Title: 'test1',
          Year: '2021',
          imdbID: '1234',
          Type: 'series',
          Poster: 'string',
        },
      ],
    };
    it('should return expected search object when serachByTitleAndType is called with title and type ', (done: DoneFn) => {
      httpClient.get.and.returnValue(of(mockSearch));
      service
        .serachByTitleAndType(mockSearch.Search[0].Title, 'movie')
        .subscribe((res) => {
          expect(res.Search.length).toEqual(2);
          expect(res.Search[0].Type).toEqual('series');
          done();
        });
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });
});
