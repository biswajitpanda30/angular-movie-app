import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-poster-card-container',
  templateUrl: './poster-card-container.component.html',
  styleUrls: ['./poster-card-container.component.scss'],
})
export class PosterCardContainerComponent {

  @Input()
  id!: string;
  @Input()
  poster!: string;
  @Input()
  title!: string;
  @Input()
  routerLink!: string;

  constructor() {}
}
