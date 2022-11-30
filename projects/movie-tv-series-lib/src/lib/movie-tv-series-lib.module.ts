import { MatDialogModule } from '@angular/material/dialog';
import { DetailComponent } from './core/components/detail/detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgModule } from '@angular/core';
import { PosterCardContainerComponent } from './core/components/poster-card-containter/poster-card-container.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FilterCardComponent } from './core/components/filter-card/filter-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { StringWithCommas } from './shared/pipes/string-with-commas.pipe';
import { EmptyRelatedContentComponent } from './core/components/empty-related-content/empty-related-content.component';

@NgModule({
  declarations: [
    FooterComponent,
    PosterCardContainerComponent,
    FilterCardComponent,
    StringWithCommas,
    DetailComponent,
    EmptyRelatedContentComponent,
  ],
  imports: [
    RouterLink,
    RouterModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    FooterComponent,
    PosterCardContainerComponent,
    FilterCardComponent,
    StringWithCommas,
    DetailComponent,
    EmptyRelatedContentComponent,
  ],
})
export class MovieTvSeriesLibModule {}
