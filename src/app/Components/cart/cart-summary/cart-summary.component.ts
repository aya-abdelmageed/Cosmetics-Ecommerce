import { Component, Input } from '@angular/core';
import { Cart } from '../../../../models/cart.model';
import { CartService } from '../../../../Services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {

  
  totalPrice$;

  constructor(private cartService: CartService) { 
    this.totalPrice$ = this.cartService.cartTotal$;
  }

}
