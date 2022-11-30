import { TvSeries } from 'src/app/shared/data/tv-series/models/tv-series';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractHttpService } from 'movie-tv-series-lib';
import { EndPoints } from 'src/app/shared/endpoints';
import { catchError, Observable, throwError } from 'rxjs';
import { Search } from '../../common/search';

@Injectable()
export class TvSeriesService extends AbstractHttpService<TvSeries> {
  constructor(private http: HttpClient) {
    super(http, EndPoints.BASEURL, environment.omdbApiKey);
  }

  serachByTitleAndType(title: string, type: string): Observable<Search> {
    return this.http
      .get<Search>(
        `${EndPoints.BASEURL}?apikey=${environment.omdbApiKey}&s=${title}&type=${type}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            'error caught in the serachByTitleAndType service';
          });
        })
      );
  }
}
