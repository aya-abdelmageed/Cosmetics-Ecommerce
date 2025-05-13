import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AuthGuard } from '../Guard/guards/auth.guard';
import { AdminGuard } from '../Guard/guards/admin.guard';
import { NotAuthorizedComponent } from './Components/not-authorized/not-authorized.component';
import { ShopComponent } from './Components/Shop/Shop.component';
import { HomeComponent } from './Components/home/home.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { BestProductsComponent } from './Components/best-products/best-products.component';


export const routes: Routes = [
   { path: 'login', component: SigninComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
   { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
=======
   { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
   // { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
>>>>>>> c1e71d6ab80e04e2299906667b8bc1bb4f40e723
   { path: 'not-authorized', component: NotAuthorizedComponent },
   { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
   {path: "product",component:ProductDetailsComponent},
   {path: "review", component:ReviewsComponent, canActivate: [AuthGuard]},
   { path: 'Shop', component: ShopComponent },
   { path: '', component: HomeComponent },
   { path: 'BestSeller', component: BestProductsComponent },
   {path: "review", component:ReviewsComponent, canActivate: [AuthGuard]},
   // {path: 'Dashboard', component:das , canActivate: [AdminGuard]}
];
<<<<<<< HEAD
RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
=======
// RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  
>>>>>>> c1e71d6ab80e04e2299906667b8bc1bb4f40e723



//>>>>>>> 1d5d5cc07f2fcca1be9e45b1ac8b61145a8599ff
