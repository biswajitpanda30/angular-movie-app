import { OwlOptions } from "ngx-owl-carousel-o";

export const owlCarouselCustomOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    740: {
      items: 3,
    },
    940: {
      items: 5,
    },
  },
  nav: false,
};
