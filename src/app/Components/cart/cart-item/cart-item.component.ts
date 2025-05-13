import { Component, Input, input } from '@angular/core';
import { CartService } from '../../../../Services/cart.service';
import { Cart } from '../../../../models/cart.model';
import { forkJoin, map } from 'rxjs';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  constructor(private cartService : CartService) {
    this.Items$ = this.cartService.cartItemsWithTotal$;
   }
  
  @Input() user:string | null = null;

  Items$: any;

  increment(itemId : number){
    if (this.user) {
      this.cartService.updateQuantity(itemId, 'increment').subscribe(() => 
      console.log('incremented'));
    }
  }

  decrement(itemId : number){
    if (this.user) {
      this.cartService.updateQuantity(itemId, 'decrement').subscribe(() => 
      console.log('decremented'));
    }
  }
  remove(itemId : number){
    if(this.user){
      this.cartService.removeFromCart(itemId).subscribe(() =>{
        //alert("Item removed from cart");
        console.log("removed");
      })
    }
  }
  
}
