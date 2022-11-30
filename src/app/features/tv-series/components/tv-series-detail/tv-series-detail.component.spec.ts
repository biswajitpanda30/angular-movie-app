import { TvSeries } from './../../../../shared/data/tv-series/models/tv-series';
import { Search } from 'src/app/shared/data/common/search';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TvSeriesDetailComponent } from './tv-series-detail.component';
import { TvSeriesService } from 'src/app/shared/data/tv-series/services/tv-series.service';

describe('TvSeriesDetailComponent', () => {
  let component: TvSeriesDetailComponent;
  let fixture: ComponentFixture<TvSeriesDetailComponent>;
  let tvSeriesServiceSpy: jasmine.SpyObj<TvSeriesService>;

  beforeEach(waitForAsync(() => {
    tvSeriesServiceSpy = jasmine.createSpyObj('TvSeriesService', [
      'getById',
      'serachByTitleAndType',
    ]);
    TestBed.configureTestingModule({
      declarations: [TvSeriesDetailComponent],
      providers: [
        {
          provide: TvSeriesService,
          useValue: tvSeriesServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    tvSeriesServiceSpy.getById.and.returnValue(of({} as TvSeries));
    tvSeriesServiceSpy.serachByTitleAndType.and.returnValue(of({} as Search));
    fixture = TestBed.createComponent(TvSeriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    let spy = spyOn(component, 'getTvSeriesAndRelatedTvSeries');
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should test ngOnDestroy', () => {
    let spy1 = spyOn(component.finalise, 'next');
    let spy2 = spyOn(component.finalise, 'complete');
    let spy3 = spyOn(component.mobileQuery, 'removeEventListener');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  describe('getTvSeriesAndRelatedTvSeries', () => {
    let mockTvSeries: TvSeries = {
     Title: 'test',
     Year: '2022',
     Rated: 'test',
     Released: 'test',
     Runtime: 'test',
     Genre: 'genre1, genre2',
     Director: 'test',
     Writer: 'test',
     Actors: 'test1, test2, test3',
     Plot: 'test',
     Language: 'test',
     Country: 'test',
     Awards: 'test',
     Poster: 'test',
     Metascore: 'test',
     imdbRating: '',
     imdbVotes: '8',
     imdbID: 'test123',
     Type: 'series',
     Response: 'true',
     TotalSeasons: ''
    };

    let mockSearch: Search = {
      Search: [
        {
          Title: 'test',
          Year: '2022',
          imdbID: 'test123',
          Type: 'series',
          Poster: 'test',
        },
        {
          Title: 'test1',
          Year: '2022',
          imdbID: 'test1234',
          Type: 'series',
          Poster: 'test',
        },
      ],
    };

    it('should test that it gives a movie with all details when id of the movie is given to getMovieAndRelatedMovie', () => {
      tvSeriesServiceSpy.getById.and.returnValue(of(mockTvSeries));
      tvSeriesServiceSpy.serachByTitleAndType.and.returnValue(of(mockSearch));
      component.getTvSeriesAndRelatedTvSeries(mockTvSeries.imdbID);

      expect(component.tvSeries).not.toBeNull();
      expect(component.tvSeries.Title).toEqual('test');
      expect(component.tvSeriesForDetailPage).toEqual(
        jasmine.objectContaining({
          poster: 'test',
          title: 'test',
          imdbRating: '',
          released: 'test',
          runtime: 'test',
          genre: 'genre1, genre2',
          actors: 'test1, test2, test3',
          director: 'test',
          language: 'test',
          plot: 'test',
        })
      );
    });

    it('should test that it gives related movies list when id of the movie is given to getMovieAndRelatedMovie', () => {
      tvSeriesServiceSpy.getById.and.returnValue(of(mockTvSeries));
      tvSeriesServiceSpy.serachByTitleAndType.and.returnValue(of(mockSearch));
      component.getTvSeriesAndRelatedTvSeries(mockTvSeries.imdbID);

      expect(component.relatedTvSeriesList).not.toBeNull();
      expect(component.relatedTvSeriesList).toEqual([
        jasmine.objectContaining({
          Title: 'test1',
          Year: '2022',
          imdbID: 'test1234',
          Type: 'series',
          Poster: 'test',
        }),
      ]);
    });
  });
});
