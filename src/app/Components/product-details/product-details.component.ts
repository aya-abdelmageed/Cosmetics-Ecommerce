import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductInfoDetailsComponent } from "../product-info-details/product-info-details.component";
import { ProductDetailsService } from '../../../Services/product-details.service';
import { ReviewsComponent } from "../reviews/reviews.component";
import {review} from "../../../models/review.model"
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ProductInfoDetailsComponent, ReviewsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private productDetails: ProductDetailsService,private http: HttpClient, private cartService : CartService, private wishService : WishlistService ){}
    quantity = 1
    product : any 
    productInfo: any;
    increaseQty() {
      this.quantity++;
    }
  
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
    }
    ngOnInit() {
       this.product = history.state.product;
       this.productInfo = this.productDetails.getProductDetails();
  }
  apiUrl : string = 'https://believed-quaint-frill.glitch.me/reviews'

  userData:any = localStorage.getItem('userEmail')?.split('@');
  wishlist: number[] = [];
  addtobag(id:number):void{
    this.cartService.addToCart(id).subscribe(cart => {
      if(cart){
        alert("💖 Great pick! Your beauty essential is on its way to your bag.");
        console.log("Added to cart Successfully")

      }
      else
        console.log("can't add to cart")
    }
    );
  }
  isInWishlist(id:number){
    return this.wishlist.includes(id);
  }
  addtowish(id:number):void{
    this.wishService.addToWishlist(id).subscribe(wish =>{
      if(wish){
        // alert("added successfully to your wishlist")
        console.log("added successfully to your wishlist")
      }
      else
        console.log("error at adding to wishlist")
    }
      
    )
  }
 handleRatingSubmission(event: { rating: number; comment: string }): void {
  const newReview: any = {
    product_id: this.product.id,
    username: this.userData[0],
    comment: event.comment,
    stars: event.rating
  };

  this.http.post<review>(this.apiUrl, newReview).subscribe(
    (res) => {
      console.log('Review added:', res);
    },
    (err) => {
      console.error('Error submitting review:', err);
    }
  );
}

  }