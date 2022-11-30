import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  showInputField = false;
  searchInput: string = '';
  titleType: string = '';
  routeToPage: string = '';

  @HostListener('window:scroll')
  scrollEvent() {
    this.isScrolled = window.scrollY >= 30;
  }

  constructor() {}

  ngOnInit(): void {
    //this.routeToPage = this.assignRouteToSearchButton();
  }

 /* assignRouteToSearchButton(): string {
    if (
      this.showInputField &&
      this.searchInput &&
      this.searchInput.length >= 3
    ) {
      this.tvSeriesService.serachTitle(this.searchInput).subscribe((res) => {
        if (res) {
          this.titleType = res.Search.Type;
          if (this.titleType === "movie") {
            return "movies";
          }
          else {
            return "tv-series";
          }
        }
        return "";
      });
    } 
    return "";
  }*/
}
