import { TvSeriesDetailComponent } from './components/tv-series-detail/tv-series-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';

const tvSeriesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TvSeriesComponent },
      { path: 'detail/:url', component: TvSeriesDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tvSeriesRoutes)],
  exports: [RouterModule],
})
export class TvSeriesRoutesModule {}
