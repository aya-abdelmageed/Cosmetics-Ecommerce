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
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
   { path: 'login', component: SigninComponent , title: 'Login' },
   { path: 'register', component: RegisterComponent , title: 'Register'},
   { path: 'cart', component: CartComponent, canActivate: [AuthGuard] , title: 'Cart'},
   { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] , title: 'Checkout'},
   { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard], title: 'Wishlist' },
   { path: 'not-authorized', component: NotAuthorizedComponent , title: 'not-authorized' },
   { path: 'product', component: ProductDetailsComponent , title: 'Product Dtails'},
   { path: 'Shop', component: ShopComponent , title: 'Shop' },
   { path: '', component: HomeComponent , title: 'Home' },
   { path: 'BestSeller', component: BestProductsComponent , title: 'BestSeller'},
   { path: 'review', component: ReviewsComponent, canActivate: [AuthGuard] , title: 'Review'},
   {
      path: 'admin-dashboard',
      component: AdminDashboardComponent,
      canActivate: [AdminGuard], title: 'Dashboard'
   },
];
RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
