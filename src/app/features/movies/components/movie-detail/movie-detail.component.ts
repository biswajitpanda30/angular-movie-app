import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../../../shared/data/movie/service/movies.service';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Movie } from '../../../../shared/data/movie/model/movie';
import { of, Subject } from 'rxjs';
import { SearchEntity } from 'src/app/shared/data/common/search';
import { owlCarouselCustomOptions } from 'src/app/shared/data/constants/owl-carousel-custom-options';
import { Detail } from 'movie-tv-series-lib';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie!: Movie;
  relatedMoviesList: SearchEntity[] = [];
  isLoading = true;
  movieForDetailPage!: Detail;

  finalise = new Subject<void>();

  customOptions = owlCarouselCustomOptions;

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change',this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.finalise)).subscribe((params) => {
      const id: string = params['url'];
      this.getMovieAndRelatedMovie(id);
    });
  }

  getMovieAndRelatedMovie(id: string) {
    this.isLoading = true;
    this.moviesService
      .getById(id)
      .pipe(
        switchMap((movie) => {
          if (!movie) {
            return of(null);
          }
          this.movie = movie;
          this.movieForDetailPage = {
            poster: movie.Poster,
            title: movie.Title,
            imdbRating: movie.imdbRating,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            actors: movie.Actors,
            director: movie.Director,
            language: movie.Language,
            plot: movie.Plot,
          };
          this.isLoading = false;
          return this.moviesService.serachByTitleAndType(movie.Title, 'movie');
        })
      )
      .pipe(takeUntil(this.finalise))
      .subscribe((res) => {
        if (res) {
          this.relatedMoviesList = res.Search.filter((el: SearchEntity) => {
            return el.Title !== this.movie.Title;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change',this._mobileQueryListener);
    this.finalise.next();
    this.finalise.complete();
  }
}
