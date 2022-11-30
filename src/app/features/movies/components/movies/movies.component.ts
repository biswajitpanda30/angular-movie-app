import { MovieNames } from 'src/app/shared/data/movie/model/movie-names';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/data/movie/model/movie';
import { MoviesService } from 'src/app/shared/data/movie/service/movies.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  moviesList: Movie[] = [];
  genreList: string[] = [];
  uniqueGenre: string[] = [];
  movieNames = MovieNames;
  filteredMoviesList: Movie[] = [];
  panelTitle = 'Genres';

  finalise = new Subject<void>();

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovieList();
    this.filteredMoviesList = this.moviesList;
  }

  getMovieList(): void {
    Object.values(this.movieNames).forEach((movie) => {
      this.moviesService
        .getByTitle(movie)
        .pipe(takeUntil(this.finalise))
        .subscribe((res) => {
          if (res) {
            this.moviesList.push(res);
            this.genreList.push(...res.Genre.split(/, /g));
            this.uniqueGenre = [...new Set(this.genreList)];
          }
        });
    });
  }

  getGenreForFilter(genre: string): void {
    if (genre) {
      this.filteredMoviesList = this.moviesList.filter((value) => {
        return value.Genre.split(/, /g).includes(genre);
      });
    }
  }

  resetFilteredList(isClosed: boolean): void {
    if (isClosed) {
      this.filteredMoviesList = this.moviesList;
    }
  }

  ngOnDestroy(): void {
    this.finalise.next();
    this.finalise.complete();
  }
}
