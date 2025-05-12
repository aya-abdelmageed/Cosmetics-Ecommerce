import { AfterViewInit, Component } from '@angular/core';
//import{Swiper}
//import Swiper from './../../../../node_modules/swiper/swiper.d';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
Swiper.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-hero-slider',
  imports: [],
templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css'
})
export class HeroSliderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.slideshow', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination-slideshow',
        clickable: true,
      },
    });
  }

}
