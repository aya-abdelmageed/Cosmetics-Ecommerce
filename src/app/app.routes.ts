import { Routes } from '@angular/router';
import { SigninComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/header/header.component';
import { CartComponent } from './Components/cart/cart.component';
import { AuthGuard } from '../Guard/guards/auth.guard';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AdminGuard } from '../Guard/guards/admin.guard';
import { NotAuthorizedComponent } from './Components/not-authorized/not-authorized.component';
import { ShopComponent } from './Components/Shop/Shop.component';
import { HomeComponent } from './Components/home/home.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { BestProductsComponent } from './Components/best-products/best-products.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';


export const routes: Routes = [
   { path: 'login', component: SigninComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
   { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
   // { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
   { path: 'not-authorized', component: NotAuthorizedComponent },
   { path: "product", component: ProductDetailsComponent},
   { path: 'Shop', component: ShopComponent },
   { path: 'BestSeller', component: BestProductsComponent },
   { path: '', component: HomeComponent },
   {path: "review", component:ReviewsComponent, canActivate: [AuthGuard]},
   // {path: 'Dashboard', component:das , canActivate: [AdminGuard]}
];



