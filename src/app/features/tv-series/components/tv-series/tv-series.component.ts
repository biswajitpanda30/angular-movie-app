import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { TvSeriesService } from 'src/app/shared/data/tv-series/services/tv-series.service';
import { TvSeries } from 'src/app/shared/data/tv-series/models/tv-series';
import { TvSeriesNames } from 'src/app/shared/data/tv-series/models/tv-series-names';
import { Subject, takeUntil } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent implements OnInit, OnDestroy {
  tvSeriesList: TvSeries[] = [];
  tvSeriesNames = TvSeriesNames;
  genreList: string[] = [];
  uniqueGenre: string[] = [];
  filteredTvSeriesList: TvSeries[] = [];
  panelTitle = 'Genres';
  isLoading = true;

  finalise = new Subject<void>();

  constructor(private tvSeriesService: TvSeriesService) {}

  ngOnInit() {
    this.getTvSeriesList();
    this.filteredTvSeriesList = this.tvSeriesList;
  }

  getTvSeriesList(): void {
    Object.values(this.tvSeriesNames).forEach((tvSeries) => {
      this.tvSeriesService
        .getByTitle(tvSeries)
        .pipe(takeUntil(this.finalise))
        .subscribe((res) => {
          if (res) {
            this.tvSeriesList.push(res);
            this.genreList.push(...res.Genre.split(/, /g));
            this.uniqueGenre = [...new Set(this.genreList)];
            this.isLoading = false;
          }
        });
    });
  }

  getGenreForFilter(genre: string): void {
    if (genre) {
      this.filteredTvSeriesList = this.tvSeriesList.filter((value) => {
        return value.Genre.split(/, /g).includes(genre);
      });
    }
  }

  resetFilteredList(isClosed: boolean): void {
    if (isClosed) {
      this.filteredTvSeriesList = this.tvSeriesList;
    }
  }

  ngOnDestroy(): void {
    this.finalise.next();
    this.finalise.complete();
  }
}
