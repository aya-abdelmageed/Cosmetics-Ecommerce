import { Component, ElementRef, Input, input, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductsService } from '../../../Services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../../Services/reviews.service';
import { review } from '../../../models/review.model';
@Component({
  standalone: true,
  selector: 'app-product-info-details',
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './product-info-details.component.html',
  styleUrl: './product-info-details.component.css'
})
export class ProductInfoDetailsComponent {
   @ViewChild('slider') slider!: ElementRef<HTMLElement>;
   errorMessage: string | undefined;
  http: any;

    constructor(private productService: ProductsService,private router: Router,private reviewService : ReviewsService,private route: ActivatedRoute){  
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}
    slideConfig = {
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      infinite: true,
      arrows: true
};

  @Input()
  product: any; 
  @Input()
  productInfo: any;
  selectedTab: string = 'details';
  reviews: review[] = [];
  showAll: boolean = false;
  displayedReviews: review[] = [];
  averageRating: number = 0;
  ratingBreakdown: { stars: number; percent: number }[] = [];
  relatedProducts: any[] = [];
   ngOnInit() {
     window.scrollTo({ top: 0, behavior: 'smooth' });
   this.route.queryParams.subscribe(params => {
    const stateProduct = history.state.product;

    if (stateProduct) {
      this.product = stateProduct;
    } else if (params['product_id']) {
      const id = params['product_id'];
      this.http.get(`https://believed-quaint-frill.glitch.me/products/${id}`).subscribe((data: any) => {
        this.product = data;
      });
    }
  });
    console.log(this.product);
    if (this.product?.brand) {
      console.log(this.product.brand)
      this.productService.getProducts().subscribe(allProducts => {
        this.relatedProducts = allProducts.filter(p =>
          p.product_type === this.product.product_type && p.id !== this.product.id
        );
        console.log(this.relatedProducts)
      });
    }}
calculateRatings() {
  if (!this.reviews || this.reviews.length === 0) return;
  console.log(this.reviews)
  const total = this.reviews.reduce((sum: number, r: any) => sum + Number(r.stars), 0);
  console.log(total," ",this.reviews.length)
  this.averageRating = parseFloat((total / this.reviews.length).toFixed(1));
  console.log(this.averageRating,"avg")
  this.ratingBreakdown = [5, 4, 3, 2, 1].map(stars => {
    const count = this.reviews.filter((r: any) => Number(r.stars) === stars).length;
    return {
      stars,
      percent: Math.round((count / this.reviews.length) * 100)
    };

  });
  console.log('ratingBreakdown:', this.ratingBreakdown);
}
      scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -300, // Adjust this value based on your slide width
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 300, // Adjust this value based on your slide width
      behavior: 'smooth'
    });
}
 goToProductDetails(product: any) {
      console.log(product,"---")
this.router.navigate(['/product'], {
  queryParams: { product_id: product.id },
  state: { product }
});
}
  getContent(tab: string): void {
    this.selectedTab = tab;
    this.reviewService.getReviewByProductId(this.product.id).subscribe({
        next: (data) => {
        this.reviews = data,
        this.displayedReviews = this.reviews.slice(0, 2);

        console.log(this.reviews)
        this.calculateRatings();},
        error: (err) => this.errorMessage = 'Could not load reviews.'
      });
  }
 
 getStars(rating: number): string[] {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push('fa-star text-warning');
    else if (i - rating < 1) stars.push('fa-star-half-alt text-warning');
    else stars.push('fa-star-o text-muted');
  }
  return stars;
}
toggleShowAll() {
  this.showAll = !this.showAll;

  if (this.showAll) {
    this.displayedReviews = this.reviews; // Show all
  } else {
    this.displayedReviews = this.reviews.slice(0, 2); 
  }
}
}
