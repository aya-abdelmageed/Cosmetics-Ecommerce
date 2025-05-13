import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
Swiper.use([Autoplay, Pagination, Navigation]);

// import { AfterViewInit, Component } from '@angular/core';
// import Swiper, { Autoplay, Pagination, Navigation } from 'swiper';
// Swiper.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements AfterViewInit {

  private swiperInstance!: Swiper;

  ngAfterViewInit(): void {
    this.swiperInstance = new Swiper('.slideshow', {
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

    const slideshowElement = document.querySelector('.slideshow');

    if (slideshowElement) {
      slideshowElement.addEventListener('mouseenter', () => {
        this.swiperInstance.autoplay.stop();
      });

      slideshowElement.addEventListener('mouseleave', () => {
        this.swiperInstance.autoplay.start();
      });
    }
  }
}