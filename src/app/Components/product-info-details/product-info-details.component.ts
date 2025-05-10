import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-product-info-details',
  imports: [SlickCarouselModule],
  templateUrl: './product-info-details.component.html',
  styleUrl: './product-info-details.component.css'
})
export class ProductInfoDetailsComponent {

    slideConfig = {
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      infinite: true
    };

     product: any; 
  relatedProducts: any[] = [];
}
