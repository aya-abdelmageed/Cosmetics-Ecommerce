import { Injectable } from '@angular/core';
import { WishlistModel } from '../models/wishlist.model';
import { BehaviorSubject, forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { ProductsService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = "http://localhost:3000/wishlists";
  private useremail: string | null = null;

  //make a wishItems behavioral subject
  public wishItems$ = new BehaviorSubject<Product[]>([]);

  //get the current wish items
  public wishlist$ = new BehaviorSubject<number[]>([]);

  
  //make the derived wish item count observable as a public observable stream.

  public wishItemCount$ = this.wishItems$.pipe(
    map(items => items.length)
  );

    constructor(private http:HttpClient, private productService : ProductsService, private authService : AuthService) {
      this.authService.auth$.pipe(take(1)).subscribe( email => {
        if(email)
        {
          this.useremail = email;
          //get user Wishlist
          this.getWishlistByUser().subscribe(wish => {
            if(wish){
              this.updateWishItems();
              console.log("got user's wishlist");
            }
          })

        }
      })
    }

  updateWishItems() : void{
    if(this.useremail)
      this.getWishlistByUser().pipe(
        switchMap(wish => {
          if(!wish ||  wish.productIds.length === 0)
          {
            this.wishItems$.next([]);
            return of([]);
          }
          const productObservables = wish.productIds.map( i =>
            this.productService.getProductById(i)
            );
            return forkJoin(productObservables);
        })
      ).subscribe(prods =>
        this.wishItems$.next(prods)
      );
  }


  //get item list 
  updateWishlist() : void{
    if(this.useremail)
      this.getWishlistByUser().subscribe(wish =>
        {
          if(!wish ||  wish.productIds.length === 0)
          {
            this.wishlist$.next([]);
          }
         else{
            this.wishlist$.next(wish.productIds);

         }
        });
  }

  //make a wishlist for user which don't have one

  createWishlist(_user: string): Observable<WishlistModel>{
    const wishlist  = {
      user : _user,
      productIds : []
    };
    return this.http.post<WishlistModel>(`${this.baseUrl}`,wishlist);
  }


  //get wishlist of user

  getWishlistByUser(): Observable<WishlistModel | null>{
    if(!this.useremail){
      return of(null);
    }
    else{
      return this.http.get<WishlistModel[]>(`${this.baseUrl}?user=${this.useremail}`).pipe(
        map(wishs => wishs.length > 0 ? wishs[0] : null)
      );
    }
  }

  //remove from Wishlist
  removeFromWishlist(productId : number) : Observable<WishlistModel>{
    return this.getWishlistByUser().pipe(
      switchMap(wish => {
        if(!wish)
          return of();

        wish.productIds = wish.productIds.filter(w => w !== productId);

        return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
          map(newWish => {
            this.updateWishItems();
            this.updateWishlist();
            return newWish;
          })
        );
      })
    )
  }

  //add to wishlist
  addToWishlist(productId : number): Observable<WishlistModel>{
    if(!this.useremail)
      return of();
    return this.getWishlistByUser().pipe(
      switchMap(wish => {
        if(!wish)
          return of();
        const index = wish.productIds.indexOf(productId);

        if(index === -1){
          wish.productIds.push(productId);
          
        }
        else{
          wish.productIds.splice(index, 1);
        }

        return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
          map(updatewish => {
            //update Items.
            this.updateWishItems();
            this.updateWishlist();
            return updatewish;
          })
        );
      })
    );
  }

}
