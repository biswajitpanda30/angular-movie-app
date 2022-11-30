import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-movie-app';

  onActivate(event: Object): void {
    window.scroll(0,0);
  }
}
