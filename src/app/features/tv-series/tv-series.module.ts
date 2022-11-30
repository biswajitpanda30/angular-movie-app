import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TvSeriesRoutesModule } from './tv-series-routing.module';
import { TvSeriesDetailComponent } from './components/tv-series-detail/tv-series-detail.component';
import { MovieTvSeriesLibModule } from 'movie-tv-series-lib';

@NgModule({
  imports: [
    SharedModule,
    CarouselModule,
    TvSeriesRoutesModule,
    MovieTvSeriesLibModule
  ],
  exports: [TvSeriesComponent, TvSeriesDetailComponent],
  declarations: [TvSeriesComponent, TvSeriesDetailComponent],
  providers: [],
})
export class TvSeriesModule {}
