import { TvSeries } from './../../shared/data/tv-series/models/tv-series';
import { TvSeriesService } from './../../shared/data/tv-series/services/tv-series.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Movie } from 'src/app/shared/data/movie/model/movie';
import { MoviesService } from 'src/app/shared/data/movie/service/movies.service';
import { HomeComponent } from './home.component';
import { MovieNames } from 'src/app/shared/data/movie/model/movie-names';
import { TvSeriesNames } from 'src/app/shared/data/tv-series/models/tv-series-names';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let tvSeriesServiceSpy: jasmine.SpyObj<TvSeriesService>;

  beforeEach(waitForAsync(() => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getByTitle']);
    tvSeriesServiceSpy = jasmine.createSpyObj('TvSeriesService', [
      'getByTitle',
    ]);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
        },
        {
          provide: TvSeriesService,
          useValue: tvSeriesServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    moviesServiceSpy.getByTitle.and.returnValue(
      of({
        Title: 'test',
        Year: '2022',
        Rated: 'string',
        Released: 'string',
        Runtime: 'string',
        Genre: 'genre1, genre1',
      } as Movie)
    );
    tvSeriesServiceSpy.getByTitle.and.returnValue(
      of({
        Title: 'test',
        Year: '2022',
        Rated: 'string',
        Released: 'string',
        Runtime: 'string',
        Genre: 'genre1, genre1',
      } as TvSeries)
    );
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    let spy1 = spyOn(component, 'getMovieList');
    let spy2 = spyOn(component, 'getTvSeriesList');
    component.ngOnInit();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
 
 describe('getMovieList', () => {
   it('should test that it creates movies list array when getMovieList method is called', () => {
     component.movieNames = MovieNames;
     component.getMovieList();

     expect(component.moviesList.length).toBeGreaterThan(0);
   });
 });

 describe('getTvSeriesList', () => {
   it('should test that it creates tv series list array when getTvSeriesList method is called', () => {
     component.tvSeriesNames = TvSeriesNames;
     component.getTvSeriesList();

     expect(component.tvSeriesList.length).toBeGreaterThan(0);
   });
 });

  it('should test ngOnDestroy and check next and complete is called', () => {
    let spy1 = spyOn(component.finalise, 'next');
    let spy2 = spyOn(component.finalise, 'complete');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
