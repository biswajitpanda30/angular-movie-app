import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { TvSeries } from 'src/app/shared/data/tv-series/models/tv-series';
import { TvSeriesService } from 'src/app/shared/data/tv-series/services/tv-series.service';
import { SearchEntity } from 'src/app/shared/data/common/search';
import { Detail } from 'movie-tv-series-lib';
import { owlCarouselCustomOptions } from 'src/app/shared/data/constants/owl-carousel-custom-options';

@Component({
  selector: 'app-tvSeries-detail',
  templateUrl: './tv-series-detail.component.html',
  styleUrls: ['./tv-series-detail.component.scss'],
})
export class TvSeriesDetailComponent implements OnInit, OnDestroy {
  tvSeries!: TvSeries;
  relatedTvSeriesList: SearchEntity[] = [];
  isLoading = true;
  tvSeriesForDetailPage!: Detail;

  customOptions = owlCarouselCustomOptions;

  finalise = new Subject<void>();

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private tvSeriesService: TvSeriesService,
    private route: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id: string = params['url'];
      this.getTvSeriesAndRelatedTvSeries(id);
    });
  }

  getTvSeriesAndRelatedTvSeries(id: string) {
    this.isLoading = true;
    this.tvSeriesService
      .getById(id)
      .pipe(
        switchMap((tvSeries) => {
          if (!tvSeries) {
            return of(null);
          }
          this.tvSeries = tvSeries;
          this.tvSeriesForDetailPage = {
            poster: tvSeries.Poster,
            title: tvSeries.Title,
            imdbRating: tvSeries.imdbRating,
            released: tvSeries.Released,
            runtime: tvSeries.Runtime,
            genre: tvSeries.Genre,
            actors: tvSeries.Actors,
            director: tvSeries.Director,
            language: tvSeries.Language,
            plot: tvSeries.Plot,
          };
          this.isLoading = false;
          return this.tvSeriesService.serachByTitleAndType(
            tvSeries.Title,
            'series'
          );
        })
      )
      .pipe(takeUntil(this.finalise))
      .subscribe((res) => {
        if (res) {
          this.relatedTvSeriesList = res.Search.filter((el: SearchEntity) => {
            return el.Title !== this.tvSeries.Title;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.finalise.next();
    this.finalise.complete();
  }
}
