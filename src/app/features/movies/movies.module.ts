import { CustomMaterialModule } from './../../shared/custom-material.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MoviesComponent } from './components/movies/movies.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MoviesRoutesModule } from './movies-routing.module';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieTvSeriesLibModule } from 'movie-tv-series-lib';

@NgModule({
  imports: [
    SharedModule,
    DragDropModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    CarouselModule,
    MoviesRoutesModule,
    MatButtonModule,
    CustomMaterialModule,
    MovieTvSeriesLibModule
  ],
  exports: [MoviesComponent, MovieDetailComponent],
  declarations: [MoviesComponent, MovieDetailComponent],
  providers: [],
})
export class MoviesModule {}
