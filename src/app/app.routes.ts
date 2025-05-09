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


export const routes: Routes = [
   //{ path: '', component: HeaderComponent },
   { path: 'login', component: SigninComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
   { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
   { path: 'not-authorized', component: NotAuthorizedComponent },
   { path: 'Shop', component: ShopComponent }
  ];
  