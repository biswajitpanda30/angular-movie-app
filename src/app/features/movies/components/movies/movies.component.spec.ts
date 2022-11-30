import { Movie } from './../../../../shared/data/movie/model/movie';
import { MovieNames } from 'src/app/shared/data/movie/model/movie-names';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/shared/data/movie/service/movies.service';
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(waitForAsync(() => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getByTitle']);
    TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
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
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    let spy = spyOn(component, 'getMovieList');
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  describe('getMovieList', () => {
    it('should test that it creates movies list array when getMovieList method is called', () => {
      component.movieNames = MovieNames;
      component.getMovieList();

      expect(component.moviesList.length).toBeGreaterThan(0);
    });

    it('should test that it creates a genre list when getMovieList method is called', () => {
      component.movieNames = MovieNames;
      component.getMovieList();

      expect(component.genreList.length).toBeGreaterThan(0);
    });

    it('should test that it creates an unique genre list when getMovieList method is called', () => {
      component.movieNames = MovieNames;
      component.getMovieList();

      expect(component.uniqueGenre).toEqual(['genre1']);
    });
  });

  it('should test that it filters the movies list based on genre when getGenreForFilter is called', () => {
    let mockMoviesList: Movie[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as Movie,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as Movie,
    ];
    component.moviesList = mockMoviesList;
    component.getGenreForFilter('Genre1');

    expect(component.filteredMoviesList).toEqual([
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as Movie,
    ]);

    component.getGenreForFilter('Genre2');

    expect(component.filteredMoviesList).toEqual([
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as Movie,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as Movie,
    ]);
  });

  it('should test that it resets filterd Movies List to full movies list when resetFilteredList is called', () => {
    let mockMoviesList: Movie[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as Movie,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as Movie,
    ];

    let mockFilteredMoviesList: Movie[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as Movie,
    ];
    component.moviesList = mockMoviesList;
    component.filteredMoviesList = mockFilteredMoviesList;
    component.resetFilteredList(true);

    expect(component.filteredMoviesList).toEqual(mockMoviesList);
  });

  it('should test ngOnDestroy and check next and complete is called', () => {
    let spy1 = spyOn(component.finalise, 'next');
    let spy2 = spyOn(component.finalise, 'complete');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
