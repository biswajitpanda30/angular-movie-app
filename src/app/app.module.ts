import { MoviesService } from './shared/data/movie/service/movies.service';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './features/home/home.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TvSeriesModule } from './features/tv-series/tv-series.module';
import { CustomMaterialModule } from './shared/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MovieTvSeriesLibModule } from 'movie-tv-series-lib';
import { CommonModule } from '@angular/common';
import { TvSeriesService } from './shared/data/tv-series/services/tv-series.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterLink,
    BrowserAnimationsModule,
    SwiperModule,
    SharedModule,
    CarouselModule,
    TvSeriesModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MovieTvSeriesLibModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [MoviesService, TvSeriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
