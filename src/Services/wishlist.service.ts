import { Injectable } from '@angular/core';
import { WishlistModel } from '../models/wishlist.model';
import { BehaviorSubject, forkJoin, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { ProductsService } from './product.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private baseUrl = "https://believed-quaint-frill.glitch.me/wishlists";
  private useremail: string | null = null;

  // Single source of truth for wishlist IDs
  private wishlistSubject = new BehaviorSubject<number[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  // Products derived from wishlist IDs
  public wishItems$ = new BehaviorSubject<Product[]>([]);
  public wishItemCount$ = this.wishlist$.pipe(map(ids => ids.length));

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private productService: ProductsService, 
    private authService: AuthService
  ) {
    this.authService.auth$.subscribe(email => {
      this.useremail = email;
      if (email) {
        this.loadWishlist();
      } else {
        this.clearWishlist();
      }
    });
  }

  private loadWishlist(): void {
    this.getWishlistByUser().subscribe(wish => {
      const productIds = wish?.productIds || [];
      this.wishlistSubject.next(productIds);
      this.updateWishItems(productIds);
    });
  }

  private clearWishlist(): void {
    this.wishlistSubject.next([]);
    this.wishItems$.next([]);
  }

  private updateWishItems(productIds: number[]): void {
    if (productIds.length === 0) {
      this.wishItems$.next([]);
      return;
    }

    forkJoin(
      productIds.map(id => this.productService.getProductById(id))
    ).subscribe(products => {
      this.wishItems$.next(products);
    });
  }

  // ... keep createWishlist and getWishlistByUser methods the same ...

    //make a wishlist for user which don't have one

  createWishlist(_user: string): Observable<WishlistModel>{
    const wishlist  = {
      user : _user,
      productIds : []
    };
    return this.http.post<WishlistModel>(`${this.baseUrl}`,wishlist);
  }


  //   //get wishlist of user

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

  removeFromWishlist(productId: number): Observable<WishlistModel> {
    return this.getWishlistByUser().pipe(
      switchMap(wish => {
        if (!wish) throw new Error('No wishlist found for user');

        wish.productIds = wish.productIds.filter(w => w !== productId);
        
        return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
          tap(newWish => {
            const updatedIds = this.wishlistSubject.value.filter(id => id !== productId);
            this.wishlistSubject.next(updatedIds);
            this.updateWishItems(updatedIds);
          })
        );
      })
    );
  }

  addToWishlist(productId: number): Observable<WishlistModel> {
    if (!this.useremail) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User not authenticated'));
    }

    return this.getWishlistByUser().pipe(
      switchMap(wish => {
        if (!wish) return throwError(() => new Error('No wishlist available'));

        const index = wish.productIds.indexOf(productId);
        if (index === -1) {
          wish.productIds.push(productId);
        } else {
          wish.productIds.splice(index, 1);
        }

        return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
          tap(updatedWish => {
            const currentIds = this.wishlistSubject.value;
            const updatedIds = index === -1 
              ? [...currentIds, productId] 
              : currentIds.filter(id => id !== productId);
            
            this.wishlistSubject.next(updatedIds);
            this.updateWishItems(updatedIds);
          })
        );
      })
    );
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {
//   private baseUrl = "http://localhost:3000/wishlists";
//   private useremail: string | null = null;

//   private wishlistSubject = new BehaviorSubject<number[]>(this.getWishlistFromStorage());
//   storageWishlist$ = this.wishlistSubject.asObservable();

//   //make a wishItems behavioral subject
//   public wishItems$ = new BehaviorSubject<Product[]>([]);

//   //get the current wish items
//   public wishlist$ = new BehaviorSubject<number[]>([]);

//   private getWishlistFromStorage(): number[] {
//     const data = localStorage.getItem('wishlist');
//     return data ? JSON.parse(data) : [];
//   }

//   private updateLocalStorage(wishlist: number[]) {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   } 
//   //make the derived wish item count observable as a public observable stream.

//   public wishItemCount$ = this.wishItems$.pipe(
//     map(items => items.length)
//   );

//     constructor(private http:HttpClient, private router:Router, private productService : ProductsService, private authService : AuthService) {
//       this.authService.auth$.subscribe( email => {
//         this.useremail = email;
//         this.wishItems$.next([]); // Clear previous user's data
//         this.wishlist$.next([]);
//         if(email)
//         {
//           //get user Wishlist
//           this.getWishlistByUser().subscribe(wish => {
//             if(wish){
//               this.updateWishItems();
//               console.log("got user's wishlist");
//             }
//           })

//         }
//       })
//     }

//   updateWishItems() : void{
//     if(this.useremail)
//       this.getWishlistByUser().pipe(
//         switchMap(wish => {
//           if(!wish ||  wish.productIds.length === 0)
//           {
//             this.wishItems$.next([]);
//             return of([]);
//           }
//           const productObservables = wish.productIds.map( i =>
//             this.productService.getProductById(i)
//             );
//             return forkJoin(productObservables);
//         })
//       ).subscribe(prods =>
//         this.wishItems$.next(prods)
//       );
//   }


//   //get item list 
//   updateWishlist() : void{
//     if(this.useremail)
//       this.getWishlistByUser().subscribe(wish =>
//         {
//           if(!wish ||  wish.productIds.length === 0)
//           {
//             this.wishlist$.next([]);
//           }
//          else{
//             this.wishlist$.next(wish.productIds);

//          }
//         });
//   }







//   //remove from Wishlist
//   removeFromWishlist(productId : number) : Observable<WishlistModel>{
//     return this.getWishlistByUser().pipe(
//       switchMap(wish => {
//         if(!wish)
//           throw new Error('No wishlist found for user');

//         wish.productIds = wish.productIds.filter(w => w !== productId);

//         return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
//           map(newWish => {
//             const current = this.wishlistSubject.value;
//             const updated = current.filter(item => item !== productId);
//             this.wishlistSubject.next(updated);
//             this.updateLocalStorage(updated);
//             this.updateWishItems();
//             this.updateWishlist();
//             return newWish;
//           })
//         );
//       })
//     )
//   }

//   //add to wishlist
//   addToWishlist(productId : number): Observable<WishlistModel>{
//     if(!this.useremail){
//       this.router.navigate(['/login']);
//       return of();
//     }
      

//     return this.getWishlistByUser().pipe(
//       switchMap(wish => {
//         if(!wish)
//           return of();
//         const index = wish.productIds.indexOf(productId);

//         if(index === -1){
//           wish.productIds.push(productId);
          
//         }
//         else{
//           wish.productIds.splice(index, 1);
//         }

//         return this.http.put<WishlistModel>(`${this.baseUrl}/${wish.id}`, wish).pipe(
//           map(updatewish => {
//             //update Items.
//             const current = this.wishlistSubject.value;
//           if (!current.includes(productId)) {
//               const updated = [...current, productId];
//               this.wishlistSubject.next(updated);
//               this.updateLocalStorage(updated);
//           }
//             this.updateWishItems();
//             this.updateWishlist();
//             return updatewish;
//           })
//         );
//       })
//     );
//   }

// }

// /*
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {
//   private wishlistSubject = new BehaviorSubject<number[]>(this.getWishlistFromStorage());
//   wishlist$ = this.wishlistSubject.asObservable();

//   private getWishlistFromStorage(): number[] {
//     const data = localStorage.getItem('wishlist');
//     return data ? JSON.parse(data) : [];
//   }

//   private updateLocalStorage(wishlist: number[]) {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   }

//   addToWishlist(id: number) {
//     const current = this.wishlistSubject.value;
//     if (!current.includes(id)) {
//       const updated = [...current, id];
//       this.wishlistSubject.next(updated);
//       this.updateLocalStorage(updated);
//     }
//     return this.wishlist$; // simulate API call
//   }

//   removeFromWishlist(id: number) {
//     const current = this.wishlistSubject.value;
//     const updated = current.filter(item => item !== id);
//     this.wishlistSubject.next(updated);
//     this.updateLocalStorage(updated);
//   }
// }
// */