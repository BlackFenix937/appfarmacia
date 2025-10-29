import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.scss'],
  standalone: false
})
export class PaginacionComponent implements OnInit {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  paginas: number = 0;
  activeIndex: number = 0;
  paginacionItems: number[] = [];

  @Input() total: number = 0;
  @Input() slidesPerView: number = 6;
  @Input() loop: boolean = false;
  @Input() porPagina: number = 20;

  constructor() { }

  ngOnInit() {
    this.inicializarSwiper();
  }

  ngAfterViewInit() {
    this.inicializarSwiper();
  }

  ngOnChanges() {
  this.paginas = Math.ceil(this.total / this.porPagina);
  this.paginacionItems = this.calcularPaginacionItems();
}

calcularPaginacionItems(): number[] {
  const items: number[] = [];
  for (let i = 1; i <= this.paginas; i++) {
    items.push(i);
  }
  return items;
}

onClickSlide(index: number) {
  this.activeIndex = index;
}

  inicializarSwiper() {
    const mySwiper = new Swiper('.swiper-container', {
      centeredSlides: true,
      initialSlide: 0,
      loop: this.loop,
      allowSlidePrev: true,
      allowSlideNext: true,
      on: {
        slideChange: () => {
          let activeSlide = mySwiper.slides[0];
          let slideWidth = activeSlide.offsetWidth;
          let slidesPerView = (mySwiper.width / (slideWidth + 10));
          let activeIndex = Math.trunc(mySwiper.slides.length / slidesPerView);
          if (mySwiper.activeIndex >= activeIndex) {
            mySwiper.allowSlideNext = false;
            mySwiper.slideTo(activeIndex)
          } else {
            mySwiper.allowSlideNext = true;
          }
        }
      }
    });
  }

}
