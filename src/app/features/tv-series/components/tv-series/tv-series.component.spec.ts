import { TvSeries } from './../../../../shared/data/tv-series/models/tv-series';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { TvSeriesComponent } from './tv-series.component';
import { TvSeriesService } from 'src/app/shared/data/tv-series/services/tv-series.service';
import { TvSeriesNames } from 'src/app/shared/data/tv-series/models/tv-series-names';

describe('TvSeriesComponent', () => {
  let component: TvSeriesComponent;
  let fixture: ComponentFixture<TvSeriesComponent>;
  let TvSeriesServiceSpy: jasmine.SpyObj<TvSeriesService>;

  beforeEach(waitForAsync(() => {
    TvSeriesServiceSpy = jasmine.createSpyObj('TvSeriesService', [
      'getByTitle',
    ]);
    TestBed.configureTestingModule({
      declarations: [TvSeriesComponent],
      providers: [
        {
          provide: TvSeriesService,
          useValue: TvSeriesServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    TvSeriesServiceSpy.getByTitle.and.returnValue(
      of({
        Title: 'test',
        Year: '2022',
        Rated: 'string',
        Released: 'string',
        Runtime: 'string',
        Genre: 'genre1, genre1',
      } as TvSeries)
    );
    fixture = TestBed.createComponent(TvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    let spy = spyOn(component, 'getTvSeriesList');
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  describe('getTvSeriesList', () => {
    it('should test that it creates tv series list array when getTvSeriesList method is called', () => {
      component.tvSeriesNames = TvSeriesNames;
      component.getTvSeriesList();

      expect(component.tvSeriesList.length).toBeGreaterThan(0);
    });

    it('should test that it creates a genre list when getTvSeriesList method is called', () => {
      component.tvSeriesNames = TvSeriesNames;
      component.getTvSeriesList();

      expect(component.genreList.length).toBeGreaterThan(0);
    });

    it('should test that it creates an unique genre list when getTvSeriesList method is called', () => {
      component.tvSeriesNames = TvSeriesNames;
      component.getTvSeriesList();

      expect(component.uniqueGenre).toEqual(['genre1']);
    });
  });

  it('should test that it filters the tv series list based on genre when getGenreForFilter is called', () => {
    let mockTvSeriesList: TvSeries[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as TvSeries,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as TvSeries,
    ];
    component.tvSeriesList = mockTvSeriesList;
    component.getGenreForFilter('Genre1');

    expect(component.filteredTvSeriesList).toEqual([
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as TvSeries,
    ]);

    component.getGenreForFilter('Genre2');

    expect(component.filteredTvSeriesList).toEqual([
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as TvSeries,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as TvSeries,
    ]);
  });

  it('should test that it resets filterd tv series List to full tv series list when resetFilteredList is called', () => {
    let mockTvSeriesList: TvSeries[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as TvSeries,
      { Title: 'test1', Genre: 'Genre2, Genre3' } as TvSeries,
    ];

    let mockFilteredTvSeriesList: TvSeries[] = [
      {
        Title: 'test1',
        Genre: 'Genre1, Genre2',
      } as TvSeries,
    ];
    component.tvSeriesList = mockTvSeriesList;
    component.filteredTvSeriesList = mockFilteredTvSeriesList;
    component.resetFilteredList(true);

    expect(component.filteredTvSeriesList).toEqual(mockTvSeriesList);
  });

  it('should test ngOnDestroy and check next and complete is called', () => {
    let spy1 = spyOn(component.finalise, 'next');
    let spy2 = spyOn(component.finalise, 'complete');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
