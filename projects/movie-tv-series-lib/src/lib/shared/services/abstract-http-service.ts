import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export class AbstractHttpService<T> {
  baseUrl!: string;
  apiKey!: string;

  constructor(private httpClient: HttpClient, baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getByTitle(title: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}?apikey=${this.apiKey}&t=${title}`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            'error caught in the getByTitle service';
          });
        })
      );
  }

  getById(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}?apikey=${this.apiKey}&i=${id}&plot=short`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            'error caught in the getById service';
          });
        })
      );
  }

  serachByTitle(title: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}?apikey=${this.apiKey}&s=${title}&type=movie`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            'error caught in the searchByTitle service';
          });
        })
      );
  }
}
