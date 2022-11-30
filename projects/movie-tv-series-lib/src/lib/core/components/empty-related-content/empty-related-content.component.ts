import { Component } from '@angular/core';

@Component({
  selector: 'lib-empty-related-content',
  template: ` <div style="padding: 5rem 0">
    <mat-icon style="font-size: 5rem" [inline]="true"
      >sentiment_dissatisfied</mat-icon
    >
    <span>No related movies</span>
  </div>`,
})
export class EmptyRelatedContentComponent {
  constructor() {}
}
