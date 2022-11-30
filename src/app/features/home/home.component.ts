import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { owlCarouselCustomOptions } from 'src/app/shared/data/constants/owl-carousel-custom-options';
import { MovieNames } from 'src/app/shared/data/movie/model/movie-names';
import { TvSeriesService } from 'src/app/shared/data/tv-series/services/tv-series.service';
import { Movie } from '../../shared/data/movie/model/movie';
import { MoviesService } from '../../shared/data/movie/service/movies.service';
import { TvSeries } from '../../shared/data/tv-series/models/tv-series';
import { TvSeriesNames } from '../../shared/data/tv-series/models/tv-series-names';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesList: Movie[] = [];
  movieNames = MovieNames;

  finalise = new Subject<void>();

  data$!: Observable<Movie[]>;

  tvSeriesList: TvSeries[] = [];
  tvSeriesNames = TvSeriesNames;

  customOptions: OwlOptions = owlCarouselCustomOptions;

  constructor(
    private moviesService: MoviesService,
    private tvSeriesService: TvSeriesService
  ) {}

  ngOnInit(): void {
    this.getMovieList();
    this.getTvSeriesList();
  }

  getMovieList(): void {
    Object.values(this.movieNames).forEach((movie) => {
      this.moviesService
        .getByTitle(movie)
        .pipe(takeUntil(this.finalise))
        .subscribe((res) => {
          if (res) {
            this.moviesList.push(res);
          }
        });
    });
  }

  getTvSeriesList(): void {
    Object.values(this.tvSeriesNames).forEach((tvSeries) => {
      this.tvSeriesService
        .getByTitle(tvSeries)
        .pipe(takeUntil(this.finalise))
        .subscribe((res) => {
          if (res) {
            this.tvSeriesList.push(res);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.finalise.next();
    this.finalise.complete();
  }
}
