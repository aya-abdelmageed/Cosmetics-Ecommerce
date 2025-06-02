import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, BehaviorSubject, forkJoin, of, take, tap } from 'rxjs';
import { Cart, CartProduct } from '../models/cart.model'; // adjust path as needed
import { ProductsService } from './product.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'https://believed-quaint-frill.glitch.me/carts';
  private useremail: string | null = null;

  //make the cart item count observable as a private observable stream.
  private cartItems = new BehaviorSubject<CartProduct[]>([]);
  //make the cart item count observable as a private observable stream.
  public cartItems$ = this.cartItems.asObservable();

  //make the cart item count observable as a public observable stream.

  cartItemCount$ = new BehaviorSubject<number>(0);

  //make the cart items with total price as a public obseralble stream. 
  public cartItemsWithTotal$ = new BehaviorSubject<any[]>([]);

  //make the cart total observable as a public observable stream.
  public cartTotal$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private router: Router, private auth:AuthService, private productService : ProductsService) {
    //this will keep track of the user email and i need to handle the 
    //unsubscribing of the observable stream
    //so i will ensure the subSCRIPTIONS HAPPENES only once and automatically completes
    
    this.auth.auth$.subscribe(email =>{
      this.useremail = email;
      this.cartItems.next([]); // Clear previous user's data
      this.cartItemsWithTotal$.next([]);
      this.cartTotal$.next(0);
      this.cartItemCount$.next(0);
      
      if(this.useremail){
        this.getCartByUser().subscribe(cart => {
          if(cart){
            this.updateCartState();
          }
        })
      }    
    })  
  }

  //helper to update the cart items count
  private updateCartItemCount(): void {
    if(this.useremail){
        this.getCartItemCount().subscribe(count => {
          this.cartItemCount$.next(count);
        })
    }
  };
  
  //helper to update cart Items
  private updateCartItems():void{
    if(this.useremail){
      this.getCartItems().subscribe(items => {
        this.cartItems.next(items);
      })
    }
  }
  

  //helpers to update cart total

  private updateCartTotal():void{
    if(this.useremail){
      this.getCartTotalPrice().subscribe(total => {
        this.cartTotal$.next(total);
      })
    }
  }

  //helper to update the cart items with total
  private updateCartItemsWithTotal():void{
    if(this.useremail){
       this.getCartByUser().subscribe((cart) => {
        if(cart){
          if (cart.products.length === 0) {
          this.cartItemsWithTotal$.next([]);
          this.cartTotal$.next(0);
        }
        else{
          const productObservables = cart.products.map(i => 
            this.productService.getProductById(i.productId).pipe(
              map(product => ({
                ...product,
                quantity: i.quantity,
                total: parseFloat(product.price) * i.quantity
              }))
            )
          );
          forkJoin(productObservables).subscribe(products => {
            this.cartItemsWithTotal$.next(products);
            const total = products.reduce((sum, p) => sum + p.total, 0);
            this.cartTotal$.next(total);
          });
        }}
      });
    }
  }
  

  //helper to update cart states:
  private updateCartState(): void {
    this.updateCartItemCount();
    this.updateCartItems();
    this.updateCartTotal();
    this.updateCartItemsWithTotal();
  }

  // Create a cart for a new user called from the register component
  createCart(_user: string): Observable<Cart> {
    const cartData = {
      user: _user,
      products: []
    };
    return this.http.post<Cart>(`${this.cartUrl}`, cartData);
  }

  // Get cart by user email
  getCartByUser(): Observable<Cart | null> {
    if(this.useremail){
      return this.http.get<Cart[]>(`${this.cartUrl}?user=${this.useremail}`).pipe(
      map(carts => carts.length > 0 ? carts[0] : null)
    );
    }
    return of(null);
  }

  // Add product to cart
  addToCart(productId: number): Observable<Cart> {
    if(!this.useremail)
    {
      this.router.navigate(['/login']);
      return of();
    }
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if (!cart) throw new Error('Cart not found');

        const index = cart.products.findIndex(p => p.productId === productId);
        if (index > -1) {
          cart.products[index].quantity += 1;
        } else {
          cart.products.push({ productId, quantity: 1 });
        }

        // return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart);
        
        //update the cart count also after update the cart
        return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart).pipe(
          map(updatedCart => {
            this.updateCartState(); // ✅ Update count, items, and total
            return updatedCart;
          })
        );
      })
    );
  }

  // Remove product from cart
  removeFromCart(productId: number): Observable<Cart> {
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if (!cart) throw new Error('Cart not found');

        cart.products = cart.products.filter(p => p.productId !== productId);

        return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart).pipe(
          tap(updatedCart => {
          // First update the basic cart items
          this.cartItems.next(updatedCart.products);
          this.cartItemCount$.next(updatedCart.products.reduce((sum, p) => sum + p.quantity, 0));
          
          // Then handle the items with total
          if (updatedCart.products.length === 0) {
            // Explicitly handle empty cart case
            this.cartItemsWithTotal$.next([]);
            this.cartTotal$.next(0);
          } else {
            // Normal case with products
            this.updateCartItemsWithTotal();
          }
        }),
        map(updatedCart => updatedCart)
        );
      })
    );
  }

  // Update quantity
  updateQuantity(productId: number, action: 'increment' | 'decrement'): Observable<Cart> {
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if (!cart) throw new Error('Cart not found');

        const product = cart.products.find(p => p.productId === productId);
        if (!product) throw new Error('Product not found in cart');

        if (action === 'increment') {
          product.quantity += 1;
        } else if (action === 'decrement') {
          if (product.quantity > 1) {
            product.quantity -= 1;
          } else {
            cart.products = cart.products.filter(p => p.productId !== productId);
          }
        }

        return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart).pipe(
          map(updatedCart => {
            this.updateCartState(); // ✅ Update count, items, and total
            return updatedCart;
          })
        );
      })
    );
  }

  //clear the cart after procced to checkout
  clearCart(): Observable<Cart> {
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if(!cart) throw new Error('Cart not found');
        cart.products = [];
        return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart).pipe(
          map(updatedCart => {
            this.updateCartState(); // ✅ Update count, items, and total
            return updatedCart;
          })
        );
      })
    );
  }

  //get the total number of items in the cart
  getCartItemCount(): Observable<number> {
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if (!cart) throw new Error('Cart not found');
        const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);
        return of (totalItems); // You can also use `of(totalItems)`
      })
    );
  }

  getCartItems():Observable<CartProduct[]>{
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if(!cart)
          throw new Error('Cart not found');
        return of(cart.products);
      })
    )
  }

  //Calculate the total price of the cart
  getCartTotalPrice(): Observable<number> {
    return this.getCartByUser().pipe(
      switchMap(cart => {
        if (!cart || cart.products.length === 0) return of(0); // No products in cart

        const productObservables = cart.products.map(product => 
          this.productService.getProductById(product.productId).pipe(
            switchMap(p => [parseFloat(p.price) * product.quantity])
          )
        );
        return forkJoin(productObservables).pipe(
          map(prices => {
            const _total = prices.reduce((total, price) => total + price, 0)
            this.cartTotal$.next(_total);
            return _total; 
          }
        )
           
        );

      })
    );
  }
}
