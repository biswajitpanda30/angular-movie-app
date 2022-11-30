import { Search } from 'src/app/shared/data/common/search';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Movie } from 'src/app/shared/data/movie/model/movie';
import { MoviesService } from 'src/app/shared/data/movie/service/movies.service';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(waitForAsync(() => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getById',
      'serachByTitleAndType',
    ]);
    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
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
    moviesServiceSpy.getById.and.returnValue(of({} as Movie));
    moviesServiceSpy.serachByTitleAndType.and.returnValue(of({} as Search));
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    let spy = spyOn(component, 'getMovieAndRelatedMovie');
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

  describe('getMovieAndRelatedMovie', () => {
    let mockMovie: Movie = {
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
      Type: 'movie',
      DVD: '',
      BoxOffice: '',
      Production: '',
      Website: '',
      Response: 'true',
    };

    let mockSearch: Search = {
      Search: [
        {
          Title: 'test',
          Year: '2022',
          imdbID: 'test123',
          Type: 'movie',
          Poster: 'test',
        },
        {
          Title: 'test1',
          Year: '2022',
          imdbID: 'test1234',
          Type: 'movie',
          Poster: 'test',
        },
      ],
    };

    it('should test that it gives a movie with all details when id of the movie is given to getMovieAndRelatedMovie', () => {
      moviesServiceSpy.getById.and.returnValue(of(mockMovie));
      moviesServiceSpy.serachByTitleAndType.and.returnValue(of(mockSearch));
      component.getMovieAndRelatedMovie(mockMovie.imdbID);

      expect(component.movie).not.toBeNull();
      expect(component.movie.Title).toEqual('test');
      expect(component.movieForDetailPage).toEqual(
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
      moviesServiceSpy.getById.and.returnValue(of(mockMovie));
      moviesServiceSpy.serachByTitleAndType.and.returnValue(of(mockSearch));
      component.getMovieAndRelatedMovie(mockMovie.imdbID);

      expect(component.relatedMoviesList).not.toBeNull();
      expect(component.relatedMoviesList).toEqual([
        jasmine.objectContaining({
          Title: 'test1',
          Year: '2022',
          imdbID: 'test1234',
          Type: 'movie',
          Poster: 'test',
        })]
      );
    });
  });
});
